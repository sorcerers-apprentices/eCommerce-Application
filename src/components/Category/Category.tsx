import type {
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk'
import s from './Category.module.scss'
import { useFetch } from '@/shared/hooks/useFetch'
import { api, type CategoryFilter } from '@/server/api'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { ProductList } from '@/components/Category/ProductList/ProductList'
import { CategoryMenu } from '@/components/Category/RenderCategory/CategoryMenu'
import { type ChangeEvent, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

export const Category = (): ReactElement => {
  const ITEMS_PER_PAGE = 6
  const [filter, setFilter] = useState<CategoryFilter>({ categoryIds: [], offset: 0, limit: ITEMS_PER_PAGE })
  const currentPage = useMemo(() => filter.offset / ITEMS_PER_PAGE, [filter])

  const productsFetcher = useCallback(() => {
    return api.product.fetchProducts(filter)
  }, [filter])

  const {
    data: products,
    error: productsError,
    loading: productsLoading,
  } = useFetch<ClientResponse<ProductProjectionPagedSearchResponse>>(productsFetcher)

  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch<ClientResponse<CategoryPagedQueryResponse>>(api.product.fetchCategories)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const handleCategoryClick = (categoryId: string): void => {
    setFilter((previous: CategoryFilter): CategoryFilter => {
      const categoryIds = previous.categoryIds.includes(categoryId)
        ? previous.categoryIds.filter((it) => it !== categoryId)
        : [...previous.categoryIds, categoryId]
      return { ...previous, categoryIds, offset: 0, sale: undefined }
    })
  }

  return (
    <section className={`section ${s.category}`}>
      <InputComponent
        onInput={(event: ChangeEvent<HTMLInputElement>) =>
          setFilter(
            (previous: CategoryFilter): CategoryFilter => ({
              ...previous,
              text: event.target.value,
            })
          )
        }
        isPassword={false}
        type={'text'}
        placeholder={'Search'}
        title={''}
        newClass={s.search}
      />
      <h2 className={`${s.title}`}>Category</h2>
      <div className={`${s.options}`}>
        <h2
          className={filter.sale === undefined ? s.activelink : ''}
          onClick={() => setFilter((previous) => ({ ...previous, sale: undefined }))}
        >
          All PRODUCTS
        </h2>
        <h2
          className={filter.sale !== undefined ? s.activelink : ''}
          onClick={() => setFilter((previous) => ({ ...previous, sale: true }))}
        >
          SALE
        </h2>
      </div>
      {categoriesLoading && <div className={s.loading}>Loading categories...</div>}
      {(categoriesError || categoriesData?.body.results.length === 0) && (
        <div className={s.empty}>No categories found</div>
      )}
      <ul className={`${s.categorylist}`}>
        <CategoryMenu categories={categoriesData?.body.results} onCategoryClick={handleCategoryClick} />
      </ul>
      {productsLoading && <div className={s.loading}>Loading products...</div>}
      {(productsError || products?.body.results.length === 0) && (
        <div className={s.empty}>
          <img src="./images/no-products.jpg" alt="no products" />
          No products found for this category
        </div>
      )}
      {products?.body.results.length !== 0 && (
        <ProductList
          products={products?.body.results || null}
          currentPage={currentPage}
          pageSize={ITEMS_PER_PAGE}
          total={products?.body.total}
          onPageChange={(page) => setFilter((previous) => ({ ...previous, offset: page * ITEMS_PER_PAGE }))}
        />
      )}
    </section>
  )
}
