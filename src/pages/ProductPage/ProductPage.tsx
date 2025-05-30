import type {
  Category,
  ClientResponse,
  ProductProjection,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk'
import { api } from '@/server/api'
import s from './ProductPage.module.scss'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/shared/hooks/useFetch'
import { Header } from '@/components/Header/Header'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { type ReactElement, useCallback, useMemo } from 'react'

const ProductPage = (): ReactElement => {
  const CENTS_IN_DOLLAR = 100
  const { id } = useParams()

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

  const {
    data: categories,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch<ClientResponse<CategoryPagedQueryResponse>>(api.product.fetchCategories)

  const discountPrice = product?.body.masterVariant.prices?.find((price) => price.discounted)?.value.centAmount
  const centPrice = product?.body.masterVariant.prices?.find((price) => price.country === 'ES')?.value.centAmount
  const brand: string | undefined = product?.body.masterVariant.attributes?.find(
    (attribute) => attribute.name === 'brand'
  )?.value
  const size: string | undefined = product?.body.masterVariant.attributes?.find(
    (attribute) => attribute.name === 'size'
  )?.value
  const volume: string | undefined = product?.body.masterVariant.attributes?.find(
    (attribute) => attribute.name === 'volume'
  )?.value
  const weight: string | undefined = product?.body.masterVariant.attributes?.find(
    (attribute) => attribute.name === 'weight'
  )?.value
  const category: Category | undefined = product?.body.categories?.[0]?.id
    ? categories?.body.results.find((category) => category.id === product.body.categories?.[0].id)
    : undefined

  return (
    <>
      <Header />
      <div className={s.productcontainer}>
        {categoriesLoading && <div>Loading information...</div>}
        {categoriesError && <div>No products found</div>}
        <Breadcrumbs allCategories={categories?.body.results ?? []} currentCategory={category} />
        <div className={s.productimage}>
          <div className={s.productimagecontainer}>
            <img
              src={product?.body.masterVariant.images?.[0].url}
              alt={product?.body.name?.['en-US'] || 'Product image'}
              className={s.productimg}
            />
          </div>
        </div>
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
          {brand && <h3>Brand: {brand}</h3>}
          {size && <h3>Size: {size}</h3>}
          {volume && <h3>Volume: {volume} ml</h3>}
          {weight && <h3>Weight: {weight} kg</h3>}
        </div>
        <div className={s.producdescription}>
          <h2>Full description:</h2>
          {category && <p>{`${category.description?.['en-US']}`}</p>}
        </div>
      </div>
    </>
  )
}

export default ProductPage
