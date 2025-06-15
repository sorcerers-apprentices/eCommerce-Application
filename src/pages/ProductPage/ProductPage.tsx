import type {
  Category,
  ClientResponse,
  ProductProjection,
  CategoryPagedQueryResponse,
  Price,
} from '@commercetools/platform-sdk'
import { api } from '@/server/api'
import s from './ProductPage.module.scss'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/shared/hooks/useFetch'
import { Header } from '@/components/Header/Header'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { type ReactElement, useCallback, useMemo, useState } from 'react'
import { type SliderImage, Slider } from '@/components/Slider/Slider.tsx'
import { Modal } from '@/shared/ui/Modal/Modal.tsx'
import { CENTS_IN_DOLLAR } from '@/shared/utilities/price.ts'
import Footer from '@/components/Footer/Footer.tsx'
import { Button } from '@/shared/ui/Button/Button.tsx'
import { toast } from 'react-hot-toast'
import { useCart } from '@/hooks/useCart.tsx'
import { findAttributeData } from '@/shared/utilities/type-utilities.ts'

const ProductPage = (): ReactElement => {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProductInCart, setIsProductInCart] = useState(false)
  const { addProductToCart, removeProductFromCart } = useCart()

  const handleOpenModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
  }

  const productFetcher = useCallback((): Promise<Error | ClientResponse<ProductProjection>> => {
    if (id) {
      return api.product.fetchProduct(id)
    } else {
      return Promise.reject('Product id is absent')
    }
  }, [id])

  const {
    data: product,
    error: productError,
    loading: productLoading,
  } = useFetch<ClientResponse<ProductProjection>>(
    productFetcher,
    useMemo(() => ({ enabled: id !== undefined }), [id])
  )

  useFetch(
    api.cart.fetchActiveCart,
    useMemo(
      () => ({
        onSuccess: (response): void => {
          const productInCart = response.body.lineItems.find((lineItem) => lineItem.productId === id)
          if (productInCart) {
            setIsProductInCart(true)
          }
        },
        onFailure: (): void => {
          toast.error('Cannot find product cart')
        },
      }),
      []
    )
  )

  const {
    data: categories,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch<ClientResponse<CategoryPagedQueryResponse>>(api.product.fetchCategories)

  const price: Price | undefined = (product?.body.masterVariant?.prices ?? [])[0]
  const discountPrice = price?.discounted?.value.centAmount
  const centPrice = price?.value.centAmount

  const category: Category | undefined = product?.body.categories?.[0]?.id
    ? categories?.body.results.find((category) => category.id === product.body.categories?.[0].id)
    : undefined
  const images: Array<SliderImage> | undefined = product?.body.masterVariant.images?.map((img) => {
    return {
      url: img.url,
      name: img.label,
    }
  })

  const addToCartHandler = async (): Promise<void> => {
    if (id) {
      await addProductToCart(id, 1)
      setIsProductInCart(true)
    }
  }
  const removeFromCartHandler = async (): Promise<void> => {
    if (id) {
      await removeProductFromCart(id)
      setIsProductInCart(false)
    }
  }

  return (
    <>
      <Header />
      <div className={`section ${s.productcontainer}`}>
        {categoriesLoading && <div>Loading information...</div>}
        {categoriesError && <div>No products found</div>}
        <Breadcrumbs allCategories={categories?.body.results ?? []} currentCategory={category} />
        <div className={s.productimage} onClick={handleOpenModal}>
          {images && <Slider images={images} />}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {images && <Slider images={images} className={'slidermodal'} />}
        </Modal>
        <div className={s.producinfo}>
          {productLoading && <div>Loading product...</div>}
          {productError && <div>No products found</div>}
          {product?.body.name && <h2>{`${product.body.name?.['en-US']}`}</h2>}
          <div className={s.pricecontainer}>
            {centPrice && (
              <p className={`${s.productprice} ${discountPrice ? s.onsale : ''}`}>€ {centPrice / CENTS_IN_DOLLAR}</p>
            )}
            {discountPrice && <p className={s.productprice}>€ {discountPrice / CENTS_IN_DOLLAR}</p>}
          </div>
          {product?.body.description && <p>{`${product.body.description?.['en-US']}`}</p>}
          {findAttributeData('brand', product) && <h3>Brand: {findAttributeData('brand', product)}</h3>}
          {findAttributeData('size', product) && <h3>Size: {findAttributeData('size', product)}</h3>}
          {findAttributeData('volume', product) && <h3>Volume: {findAttributeData('volume', product)} ml</h3>}
          {findAttributeData('weight', product) && <h3>Weight: {findAttributeData('weight', product)} kg</h3>}
          <div>
            {isProductInCart ? (
              <Button onClick={async () => removeFromCartHandler()} disabled={!isProductInCart}>
                Remove from Cart
              </Button>
            ) : (
              <Button onClick={async () => addToCartHandler()} disabled={isProductInCart}>
                Add to Cart
              </Button>
            )}
          </div>
        </div>
        <div className={s.producdescription}>
          <h2>Full description:</h2>
          {category && <p>{`${category.description?.['en-US']}`}</p>}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductPage
