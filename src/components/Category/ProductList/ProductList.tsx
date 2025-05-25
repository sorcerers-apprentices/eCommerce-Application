import type { ProductProjection } from '@commercetools/platform-sdk'
import s from './ProductList.module.scss'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

type ProductListProperties = {
  currentPage: number
  pageSize: number
  total?: number
  onPageChange: (page: number) => void
  products: ProductProjection[] | null
  loading: boolean
  error: string | null
}

export const ProductList = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  products,
  loading,
  error,
}: ProductListProperties): ReactElement => {
  const CENTS_IN_DOLLAR = 100
  const MAX_PAGE_BUTTONS = 10

  if (loading) {
    return <div className={s.loading}>Loading products...</div>
  }

  if (!products || products.length === 0 || error) {
    return (
      <div className={s.empty}>
        <img src="./images/no-products.jpg" alt="no products" />
        No products found for this category
      </div>
    )
  }

  const totalProducts = total || 0
  const totalPages = Math.ceil(totalProducts / pageSize)

  const getPaginationButtons = (): (number | string)[] => {
    const buttons: (number | string)[] = []

    if (totalPages <= MAX_PAGE_BUTTONS) {
      return Array.from({ length: totalPages }, (_, pageIndex) => pageIndex)
    }

    const sideButtons = 2
    const aroundCurrent = 2
    buttons.push(1)

    let start = Math.max(sideButtons, currentPage - aroundCurrent)
    let end = Math.min(totalPages - sideButtons, currentPage + aroundCurrent)

    const buttonsNeeded = MAX_PAGE_BUTTONS - sideButtons
    if (end - start + 1 < buttonsNeeded) {
      if (currentPage < totalPages / sideButtons) {
        end = Math.min(totalPages - 1, start + buttonsNeeded - 1)
      } else {
        start = Math.max(sideButtons, end - buttonsNeeded + 1)
      }
    }

    if (start > sideButtons) {
      buttons.push('...')
    }

    for (let index = start; index <= end; index++) {
      buttons.push(index)
    }

    if (end < totalPages - sideButtons) {
      buttons.push('...')
    }

    buttons.push(totalPages - 1)
    return buttons
  }

  const goToPage = (page: number): void => {
    onPageChange(Math.max(0, Math.min(page, totalPages - 1)))
  }

  return (
    <div className={s.productssection}>
      <ul className={s.productlist}>
        {products.map((product) => {
          const id = product.masterVariant.key?.toLowerCase()
          const centPrice = product.masterVariant.prices?.find((price) => price.country === 'ES')?.value.centAmount
          return (
            <li key={product.id} className={s.productitem}>
              <Link to={`/product/${id}`}>
                <img
                  src={product.masterVariant.images?.[0].url}
                  alt={product.name?.['en-US'] || 'Product image'}
                  className={s.productImage}
                />
                {product.name?.['en-US'] && <p>{product.name['en-US']}</p>}
                {centPrice && <p>€ {centPrice / CENTS_IN_DOLLAR}</p>}
                {product.description?.['en-US'] && <p>{product.description['en-US']}</p>}
              </Link>
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <div className={s.pagination}>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0} className={s.paginationbutton}>
            Previous
          </button>
          {getPaginationButtons().map((pageIndex, index) =>
            typeof pageIndex === 'string' ? (
              <span key={`ellipsis-${index}`} className={s.ellipsis}>
                {pageIndex}
              </span>
            ) : (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                className={`${s.paginationbutton} ${currentPage === pageIndex ? s.active : ''}`}
              >
                {pageIndex + 1}
              </button>
            )
          )}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={s.paginationbutton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
