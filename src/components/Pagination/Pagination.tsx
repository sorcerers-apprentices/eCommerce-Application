import type { ReactElement } from 'react'
import s from './Pagination.module.scss'

export type PaginationProperties = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProperties): ReactElement => {
  const MAX_PAGE_BUTTONS = 4

  const getPaginationButtons = (): (number | string)[] => {
    const buttons: (number | string)[] = []

    if (totalPages <= MAX_PAGE_BUTTONS) {
      return Array.from({ length: totalPages }, (_, pageIndex) => pageIndex)
    }

    const sideButtons = 2
    const aroundCurrent = 2
    buttons.push(0)

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

    for (let index = start - 1; index <= end; index++) {
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
  )
}
