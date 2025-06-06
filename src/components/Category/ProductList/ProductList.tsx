import type { ProductProjection } from '@commercetools/platform-sdk'
import s from '../Category.module.scss'
import { type ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from '@/components/Pagination/Pagination.tsx'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { CENTS_IN_DOLLAR } from '@/shared/utilities/price.ts'
import { CartContext } from '@/app/providers/CartProvider/CartContext.ts'
import { api } from '@/server/api.ts'

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

  const addProductToCart = async (id: string): Promise<void> => {
    if (state.id) {
      const response = await api.cart.addProductToCart(state.id, id, 1)
      console.log(response)
    }
  }

  return (
    <section className={s.productssection}>
      <ul className={s.productlist}>
        {products?.map((product) => {
          const id = product.id
          const centPrice = product.masterVariant.prices?.find((price) => price.country === 'ES')?.value.centAmount
          const discountPrice = product.masterVariant.prices?.find((price) => price.discounted)?.value.centAmount
          return (
            <li key={product.id}>
              <button className={s.iconcontainer} onClick={async () => await addProductToCart(id)}>
                <HiOutlineShoppingCart className="icon" />
              </button>
              <Link to={`/product/${id}`} className={s.productitem}>
                {discountPrice && <span className={s.salenumber}>15% OFF</span>}
                <img
                  src={product.masterVariant.images?.[0].url}
                  alt={product.name?.['en-US'] || 'Product image'}
                  className={s.productImage}
                />
                {product.name?.['en-US'] && <p className={s.productname}>{product.name['en-US']}</p>}
                <div className={s.pricecontainer}>
                  {centPrice && (
                    <p className={`${s.productprice} ${discountPrice ? s.onsale : ''}`}>
                      € {centPrice / CENTS_IN_DOLLAR}
                    </p>
                  )}
                  {discountPrice && <p className={s.productprice}>€ {discountPrice / CENTS_IN_DOLLAR}</p>}
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
