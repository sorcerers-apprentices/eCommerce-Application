import type { ProductProjection } from '@commercetools/platform-sdk'
import s from '../Category.module.scss'
import { type ReactElement, useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from '@/components/Pagination/Pagination.tsx'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { CENTS_IN_EURO } from '@/shared/utilities/price.ts'
import { CartContext } from '@/app/providers/CartProvider/CartContext.ts'
import { api } from '@/server/api.ts'
import { useFetch } from '@/shared/hooks/useFetch.tsx'
import { toast } from 'react-hot-toast'
import Loader from '@/shared/ui/Loader/Loader.tsx'
import { useCart } from '@/hooks/useCart'

type ProductListProperties = {
  currentPage: number
  pageSize: number
  total?: number
  onPageChange: (page: number) => void
  products: ProductProjection[] | null
}

export const ProductList = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  products,
}: ProductListProperties): ReactElement => {
  const totalProducts = total || 0
  const totalPages = Math.ceil(totalProducts / pageSize)
  const { state } = useContext(CartContext)
  const { addProductToCart } = useCart()

  const { refetch } = useFetch(
    api.cart.fetchActiveCart,
    useMemo(
      () => ({
        onSuccess: (response): void => {
          const productIds = response.body.lineItems.map((lineItem) => lineItem.productId)
          setProductsInCart((previous) => [...previous, ...productIds])
        },
        onFailure: (): void => {
          toast.error('Cannot find product cart')
        },
      }),
      []
    )
  )

  const [productsInCart, setProductsInCart] = useState<Array<string>>([])
  const [loadingProductIds, setLoadingProductIds] = useState<Array<string>>([])

  const addToCart = async (productId: string): Promise<void> => {
    if (!state.id) return
    setLoadingProductIds((prev) => [...prev, productId])
    setProductsInCart((prev) => [...prev, productId])
    await addProductToCart(productId, 1)
    refetch()
    setLoadingProductIds((prev) => prev.filter((id) => id !== productId))
  }

  return (
    <section className={s.productssection}>
      <ul className={s.productlist}>
        {products?.map((product) => {
          const id = product.id
          const centPrice = product.masterVariant.scopedPrice?.value.centAmount ?? 0
          const discountPrice = product.masterVariant.scopedPrice?.discounted?.value.centAmount
          const discount = discountPrice && CENTS_IN_EURO - (discountPrice / centPrice) * CENTS_IN_EURO
          return (
            <li key={product.id}>
              <button
                className={s.iconcontainer}
                onClick={async () => await addToCart(id)}
                disabled={productsInCart.includes(product.id)}
              >
                <HiOutlineShoppingCart className="icon" />
              </button>
              <Link to={`/product/${id}`} className={s.productitem}>
                {loadingProductIds.includes(id) && <Loader />}
                {discount && <span className={s.salenumber}>{discount}% OFF</span>}
                <img
                  src={product.masterVariant.images?.[0].url}
                  alt={product.name?.['en-US'] || 'Product image'}
                  className={s.productImage}
                />
                {product.name?.['en-US'] && <p className={s.productname}>{product.name['en-US']}</p>}
                <div className={s.pricecontainer}>
                  {centPrice && (
                    <p className={`${s.productprice} ${discountPrice ? s.onsale : ''}`}>
                      € {centPrice / CENTS_IN_EURO}
                    </p>
                  )}
                  {discountPrice && <p className={s.productprice}>€ {discountPrice / CENTS_IN_EURO}</p>}
                </div>
                {product.description?.['en-US'] && <p>{product.description['en-US']}</p>}
              </Link>
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange}></Pagination>
      )}
    </section>
  )
}
