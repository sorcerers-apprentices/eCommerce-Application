import s from './SortComponent.module.scss'
import { useSearchParams } from 'react-router-dom'
import { type ReactElement, useEffect, useState } from 'react'

enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export type FieldType = {
  name: string
  locale?: string
}

export type SortType = { [field: string]: { locale?: string; direction?: Direction } }

type SortControlProperties = {
  fields: Array<FieldType>
  onSortChange: (sort: SortType) => void
}

export const SortControlComponent = ({ fields, onSortChange }: SortControlProperties): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getInitialSort = (): SortType => {
    const field = searchParams.get('field')
    const directionParam = searchParams.get('direction')
    const direction = directionParam === Direction.ASC || directionParam === Direction.DESC ? directionParam : undefined

    const sort: SortType = {}

    for (const fieldItem of fields) {
      sort[fieldItem.name] = {
        locale: fieldItem.locale,
        direction: fieldItem.name === field ? direction : undefined,
      }
    }

    return sort
  }

  const [sort, setSort] = useState<SortType>(getInitialSort)

  useEffect(() => {
    onSortChange(sort)
  }, [sort])

  const toArrow = (direction: Direction | undefined): ' ↑' | ' ↓' | '' => {
    switch (direction) {
      case undefined:
        return ''
      case Direction.ASC:
        return ' ↑'
      case Direction.DESC:
        return ' ↓'
    }
  }

  const flipDirection = (direction: Direction | undefined): Direction => {
    switch (direction) {
      case Direction.ASC:
        return Direction.DESC
      case undefined:
      case Direction.DESC:
        return Direction.ASC
    }
  }

  const updateSortInUrl = (field: string, direction: Direction | undefined): void => {
    const updatedParams = new URLSearchParams(searchParams.toString())

    if (direction === undefined) {
      updatedParams.delete('field')
      updatedParams.delete('direction')
    } else {
      updatedParams.set('field', field)
      updatedParams.set('direction', direction)
    }

    setSearchParams(updatedParams, { replace: true })
  }

  const renderFieldSortButtons = (): Array<ReactElement> => {
    return fields.map((field) => {
      const optionName = field.name + toArrow(sort[field.name]?.direction)
      const handler = (): void => {
        setSort((prev) => {
          const nextDirection = flipDirection(prev[field.name]?.direction)
          const updatedSort: SortType = {}

          for (const item of fields) {
            updatedSort[item.name] = {
              locale: item.locale,
              direction: item.name === field.name ? nextDirection : undefined,
            }
          }

          updateSortInUrl(field.name, nextDirection)
          return updatedSort
        })
      }

      return (
        <button key={field.name} onClick={handler} className={s.btn}>
          {optionName}
        </button>
      )
    })
  }

  const resetSort = (): void => {
    const defaultSort: SortType = {}

    for (const field of fields) {
      defaultSort[field.name] = { locale: field.locale }
    }

    setSort(defaultSort)
    setSearchParams(
      (params) => {
        const newParams = new URLSearchParams(params.toString())
        newParams.delete('field')
        newParams.delete('direction')
        return newParams
      },
      { replace: true }
    )
  }

  return (
    <div className={s.sortcontainer}>
      <button key={'default'} onClick={resetSort} className={s.btn}>
        Default
      </button>
      {renderFieldSortButtons()}
    </div>
  )
}
