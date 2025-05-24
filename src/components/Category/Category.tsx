import s from './Category.module.scss'
import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { categories, categoryIdMapForProductsFetch } from '@/components/Category/Categaries.ts'
import { api } from '@/server/api.ts'
import type { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk'
import { RenderCategory } from '@/components/Category/RenderCategory/RenderCategory.tsx'
import { ProductList } from '@/components/Category/ProductList/ProductList.tsx'
import { useFetch } from '@/shared/hooks/useFetch.tsx'

export const Category = (): ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const ITEMS_PER_PAGE = 6

  const fetcher = useCallback(() => {
    if (selectedCategory) {
      return api.product.fetchProductsInCategory(selectedCategory, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE)
    } else {
      return api.product.fetchProducts(currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE)
    }
  }, [selectedCategory, currentPage])

  const { data, error, loading } = useFetch<ClientResponse<ProductProjectionPagedSearchResponse>>(fetcher)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const handleCategoryClick = (categoryPath: string): void => {
    const categoryId = categoryIdMapForProductsFetch[categoryPath]
    if (categoryId) {
      setSelectedCategory(categoryId)
      setCurrentPage(0)
    }
  }

  return (
    <section className={`section ${s.category}`}>
      <h2 className={`${s.title}`}>Category</h2>
      <ul className={`${s.categorylist}`}>
        {categories.map((category, index) => (
          <RenderCategory key={`${category.name}-${index}`} category={category} onCategoryClick={handleCategoryClick} />
        ))}
      </ul>
      <ProductList
        products={data?.body.results || null}
        loading={loading}
        error={error ? String(error) : null}
        currentPage={currentPage}
        pageSize={ITEMS_PER_PAGE}
        total={data?.body.total}
        onPageChange={setCurrentPage}
      />
    </section>
  )
}
