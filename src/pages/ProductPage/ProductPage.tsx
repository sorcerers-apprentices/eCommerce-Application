import { type ReactElement, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import s from './ProductPage.module.scss'
import { useFetch } from '@/shared/hooks/useFetch.tsx'
import type {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjection,
} from '@commercetools/platform-sdk'
import { api } from '@/server/api.ts'
import { NavLink } from 'react-router'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig.tsx'

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
  const category = categories?.body.results.find((data) => data.id === product?.body.categories?.[0].id)

  const findCategoriesPath = (category: Category | undefined): Array<Category> => {
    if (!category) {
      return []
    }
    return [...findCategoriesPath(categories?.body.results.find((it) => it.id === category.parent?.id)), category]
  }

  return (
    <>
      <Header />
      <div className={s.productcontainer}>
        {categoriesLoading && <div>Loading information...</div>}
        {categoriesError && <div>No products found</div>}
        <div className={s.breadcrumb}>
          <NavLink to={RoutePath.MAIN} className={s.link}>
            Main
          </NavLink>
          <span> &gt; </span>
          <NavLink to={RoutePath.CATALOG} className={s.link}>
            Catalog
          </NavLink>
          <span> &gt; </span>
          {findCategoriesPath(category).map((breadCrumbCategory, i, array) => (
            <>
              <NavLink to={`${RoutePath.CATALOG}?category=${breadCrumbCategory?.id}`} className={s.link}>
                {breadCrumbCategory.name['en']}
              </NavLink>
              {array.length > i + 1 && <span> &gt; </span>}
            </>
          ))}
        </div>
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
