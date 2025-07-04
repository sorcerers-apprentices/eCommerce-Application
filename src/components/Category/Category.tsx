import type {
  FacetTerm,
  ClientResponse,
  CategoryPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk'
import s from './Category.module.scss'
import { TbSearch } from 'react-icons/tb'
import { useFetch } from '@/shared/hooks/useFetch'
import { useSearchParams } from 'react-router-dom'
import { api, type CategoryFilter } from '@/server/api'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { ProductList } from '@/components/Category/ProductList/ProductList'
import { CategoryMenu } from '@/components/Category/RenderCategory/CategoryMenu'
import { SortControlComponent } from '@/components/Category/SortComponent/SortControlComponent'
import { type ChangeEvent, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { CENTS_IN_EURO } from '@/shared/utilities/price.ts'

const ITEMS_PER_PAGE = 6

const DEFAULT_PRICE_FROM_EUR = 1
const DEFAULT_PRICE_TO_EUR = 1000

export const Category = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams()
  const metaParam = searchParams.get('meta')
  const slugsParams: string[] = useMemo(
    () => [...searchParams.getAll('category'), ...searchParams.getAll('subcategory')],
    [searchParams]
  )

  const [filter, setFilter] = useState<CategoryFilter>({
    categoryIds: [],
    offset: 0,
    limit: ITEMS_PER_PAGE,
    sort: {},
    text: searchParams.get('search') ?? '',
    brand: '',
    sale: metaParam === 'sale' ? true : undefined,
    priceRange: { from: DEFAULT_PRICE_FROM_EUR * CENTS_IN_EURO, to: DEFAULT_PRICE_TO_EUR * CENTS_IN_EURO },
  })

  const currentPage = useMemo(() => filter.offset / ITEMS_PER_PAGE, [filter])

  const productsFetcher = useCallback(() => api.product.fetchProducts(filter), [filter])
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

  useEffect((): void => {
    if (!categoriesData) return

    const matchingIds = categoriesData.body.results
      .filter((category) => {
        const slug = category.slug['en']?.toLowerCase()
        return slug !== undefined && slugsParams.includes(slug)
      })
      .map((category) => category.id)

    setFilter((prev) => ({ ...prev, categoryIds: matchingIds, offset: 0 }))
  }, [categoriesData, slugsParams])

  useEffect((): void => {
    window.scrollTo(0, 0)
  }, [currentPage])

  useEffect((): void => {
    const params = new URLSearchParams(searchParams.toString())
    if (filter.sale) {
      params.set('meta', 'sale')
    } else {
      params.delete('meta')
    }
    setSearchParams(params, { replace: true })
  }, [filter.sale, searchParams, setSearchParams])

  useEffect((): void => {
    const search = searchParams.get('search') ?? ''
    const brand = searchParams.get('brand') ?? ''

    const meta = searchParams.get('meta')
    const saleValue = meta === 'sale' ? true : undefined

    const priceFromParam = parseInt(searchParams.get('priceFrom') ?? '', 10)
    const priceToParam = parseInt(searchParams.get('priceTo') ?? '', 10)

    const priceFrom = Number.isNaN(priceFromParam)
      ? DEFAULT_PRICE_FROM_EUR * CENTS_IN_EURO
      : priceFromParam * CENTS_IN_EURO

    const priceTo = Number.isNaN(priceToParam) ? DEFAULT_PRICE_TO_EUR * CENTS_IN_EURO : priceToParam * CENTS_IN_EURO

    setFilter((prev) => ({
      ...prev,
      text: search,
      brand,
      priceRange: { from: priceFrom, to: priceTo },
      sale: saleValue,
      offset: 0,
    }))
  }, [searchParams])

  const handleCategoryClick = (categoryId: string): void => {
    setFilter((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
      offset: 0,
    }))
  }

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value
    setFilter((prev) => ({ ...prev, text }))
    const params = new URLSearchParams(searchParams.toString())
    if (text) params.set('search', text)
    else params.delete('search')
    setSearchParams(params)
  }

  const handleBrandFilterChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const brand = event.target.value
    setFilter((prev) => ({ ...prev, brand }))

    const params = new URLSearchParams(searchParams.toString())
    if (brand) params.set('brand', brand)
    else params.delete('brand')

    setSearchParams(params)
  }

  const handlePriceChange =
    (field: 'from' | 'to') =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      const euroValue = +e.target.value
      const cents = euroValue * CENTS_IN_EURO

      setFilter((prev) => ({
        ...prev,
        priceRange: { ...prev.priceRange, [field]: cents },
      }))

      const params = new URLSearchParams(searchParams.toString())

      if (field === 'from') {
        if (euroValue) params.set('priceFrom', euroValue.toString())
        else params.delete('priceFrom')
      } else {
        if (euroValue) params.set('priceTo', euroValue.toString())
        else params.delete('priceTo')
      }

      setSearchParams(params)
    }

  const handlePageChange = (page: number): void => {
    setFilter((prev) => ({ ...prev, offset: page * ITEMS_PER_PAGE }))
  }

  const brands = useMemo<FacetTerm[]>(() => {
    const facet = facets?.body.facets?.['variants.attributes.brand']
    if (facet && facet.type === 'terms') {
      return facet.terms
    }
    return []
  }, [facets])

  const handleClearFilters = (): void => {
    setFilter((prev) => ({
      ...prev,
      brand: '',
      categoryIds: [],
      priceRange: { from: DEFAULT_PRICE_FROM_EUR * CENTS_IN_EURO, to: DEFAULT_PRICE_TO_EUR * CENTS_IN_EURO },
      offset: 0,
    }))

    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('brand')
    newParams.delete('category')
    newParams.delete('subcategory')
    newParams.delete('priceFrom')
    newParams.delete('priceTo')
    setSearchParams(newParams, { replace: true })
  }

  return (
    <section className={`section ${s.category}`}>
      <h2 className={`title ${s.title}`}>Category</h2>

      <div className={s.options}>
        <h2
          onClick={() => setFilter((prev) => ({ ...prev, sale: undefined }))}
          className={!filter.sale ? s.activelink : ''}
        >
          All PRODUCTS
        </h2>
        <h2 onClick={() => setFilter((prev) => ({ ...prev, sale: true }))} className={filter.sale ? s.activelink : ''}>
          SALE
        </h2>
      </div>

      {categoriesLoading && <div className={s.loading}>Loading categories...</div>}
      {(categoriesError || !categoriesData) && <div className={s.empty}>No categories found</div>}

      <ul className={s.categorylist}>
        <CategoryMenu categories={categoriesData?.body.results} onCategoryClick={handleCategoryClick} />
        {facetsLoading && <div className={s.loading}>Loading brands...</div>}
        {(facetsError || brands.length === 0) && <div>We don't have any brands</div>}
        <SelectInput
          className={s.input}
          name="brand"
          title="Brand"
          value={filter.brand}
          options={brands.map((term) => term.term)}
          onChange={handleBrandFilterChange}
        />
        <InputComponent
          newClass={s.input}
          name="from"
          title="From €"
          type="number"
          value={filter.priceRange.from / CENTS_IN_EURO}
          min={DEFAULT_PRICE_FROM_EUR}
          step={1}
          onChange={handlePriceChange('from')}
        />
        <InputComponent
          newClass={s.input}
          name="to"
          title="To €"
          type="number"
          value={filter.priceRange.to / CENTS_IN_EURO}
          max={DEFAULT_PRICE_TO_EUR}
          step={1}
          onChange={handlePriceChange('to')}
        />
        <button className={s.button} onClick={handleClearFilters}>
          Reset filters
        </button>
      </ul>

      <div className={s.searchsort}>
        <div className={s.search}>
          <input
            className={s.searchinput}
            type="text"
            placeholder="Search"
            value={filter.text}
            onInput={handleSearchInput}
          />
          <TbSearch className={s.searchicon} />
        </div>
        <SortControlComponent
          fields={[{ name: 'name', locale: 'en-US' }, { name: 'price' }]}
          onSortChange={(sort) => setFilter((prev) => ({ ...prev, sort }))}
        />
      </div>

      {productsLoading && <div className={s.loading}>Loading products...</div>}
      {(productsError || products?.body.results?.length === 0) && !productsLoading && (
        <div className={s.empty}>
          <img src="/images/no-products.jpg" alt="no products" />
          No products found for this category
        </div>
      )}

      {products?.body.results?.length ? (
        <ProductList
          products={products.body.results}
          currentPage={currentPage}
          pageSize={ITEMS_PER_PAGE}
          total={products.body.total}
          onPageChange={handlePageChange}
        />
      ) : null}
    </section>
  )
}
