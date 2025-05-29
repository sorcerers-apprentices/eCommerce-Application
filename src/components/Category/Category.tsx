import s from './Category.module.scss'
import { type ChangeEvent, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { api, type CategoryFilter } from '@/server/api.ts'
import type {
  CategoryPagedQueryResponse,
  ClientResponse,
  FacetResult,
  FacetTerm,
  ProductProjectionPagedSearchResponse,
  TermFacetResult,
} from '@commercetools/platform-sdk'
import { CategoryMenu } from '@/components/Category/RenderCategory/CategoryMenu.tsx'
import { ProductList } from '@/components/Category/ProductList/ProductList.tsx'
import { useFetch } from '@/shared/hooks/useFetch.tsx'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
import { SortControlComponent } from '@/components/Category/SortComponent/SortControlComponent.tsx'
import { useSearchParams } from 'react-router-dom'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput.tsx'

export const Category = (): ReactElement => {
  const ITEMS_PER_PAGE = 6
  const CENTS_IN_DOLLAR = 100
  const [searchParams, setSearchParams] = useSearchParams()
  const initialText = searchParams.get('search') ?? ''
  const initialCategoryParam = searchParams.get('subcategory') ?? searchParams.get('category')
  const initialCategoryIds = initialCategoryParam ? [initialCategoryParam] : []
  const [filter, setFilter] = useState<CategoryFilter>({
    categoryIds: initialCategoryIds,
    offset: 0,
    limit: ITEMS_PER_PAGE,
    sort: {},
    text: initialText,
    brand: '',
    priceRange: { from: 100, to: 100000 },
  })
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
    data: facets,
    error: facetsError,
    loading: facetsLoading,
  } = useFetch<ClientResponse<ProductProjectionPagedSearchResponse>>(api.product.fetchFacets)

  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch<ClientResponse<CategoryPagedQueryResponse>>(api.product.fetchCategories)

  const brands: Array<FacetTerm> = useMemo(() => {
    if (!facets) {
      return []
    }
    const brands = (facets.body.facets ?? {})['variants.attributes.brand'] ?? []
    const isTermFacet = (facet: FacetResult): facet is TermFacetResult => facet.type === 'terms'
    if (isTermFacet(brands)) {
      return brands.terms
    }
    return []
  }, [facets])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  useEffect(() => {
    const search = searchParams.get('search') ?? ''
    setFilter((previous) => ({ ...previous, text: search, offset: 0 }))
  }, [searchParams])

  const handleCategoryClick = (categoryId: string): void => {
    setFilter((previous: CategoryFilter): CategoryFilter => {
      const categoryIds = previous.categoryIds.includes(categoryId)
        ? previous.categoryIds.filter((it) => it !== categoryId)
        : [...previous.categoryIds, categoryId]
      return { ...previous, categoryIds, offset: 0, sale: undefined }
    })
  }

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value
    setFilter(
      (previous: CategoryFilter): CategoryFilter => ({
        ...previous,
        text: text,
      })
    )
    const params = Object.fromEntries(searchParams.entries())
    if (text) {
      params.search = text
    } else {
      delete params.search
    }
    setSearchParams(params)
  }

  const handleBrandFilterChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const brand = event.target.value
    setFilter(
      (previous: CategoryFilter): CategoryFilter => ({
        ...previous,
        brand: brand,
      })
    )
  }

  const handlePageChange = (page: number): void => {
    const newOffset = page * ITEMS_PER_PAGE
    setFilter((prev) => ({ ...prev, offset: newOffset }))
  }

  return (
    <section className={`section ${s.category}`}>
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
        {facetsLoading && <div className={s.loading}>Loading brands...</div>}
        {(facetsError || brands.length === 0) && <div>We don't have any brands</div>}
        <SelectInput
          name={'brand'}
          title={'Brand'}
          options={brands.map((term) => term.term)}
          onChange={handleBrandFilterChange}
        />
        <InputComponent
          value={filter.priceRange.from / CENTS_IN_DOLLAR}
          name={'from'}
          title={'From €'}
          type={'number'}
          placeholder={'1'}
          allowWhitespaces={false}
          min={1}
          step={1}
          onChange={(event) =>
            setFilter(
              (previous): CategoryFilter => ({
                ...previous,
                priceRange: { ...previous.priceRange, from: +event.target.value * CENTS_IN_DOLLAR },
              })
            )
          }
        />
        <InputComponent
          value={filter.priceRange.to / CENTS_IN_DOLLAR}
          name={'to'}
          title={'To €'}
          type={'number'}
          placeholder={'100'}
          allowWhitespaces={false}
          max={1000}
          step={1}
          onChange={(event) =>
            setFilter(
              (previous): CategoryFilter => ({
                ...previous,
                priceRange: { ...previous.priceRange, to: +event.target.value * CENTS_IN_DOLLAR },
              })
            )
          }
        />
      </ul>
      <div className={s.searchsort}>
        <InputComponent
          onInput={handleSearchInput}
          isPassword={false}
          type={'text'}
          placeholder={'Search'}
          title={''}
          newClass={s.search}
        />
        <SortControlComponent
          fields={[{ name: 'name', locale: 'en-US' }, { name: 'price' }]}
          onSortChange={(sort) => setFilter((previous) => ({ ...previous, sort }))}
        />
      </div>
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
          onPageChange={handlePageChange}
        />
      )}
    </section>
  )
}
