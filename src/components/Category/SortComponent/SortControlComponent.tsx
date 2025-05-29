import s from './SortComponent.module.scss'
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
  const convertFieldsToSort = (fields: Array<FieldType>): SortType => {
    const sort: SortType = {}
    for (const field of fields) {
      sort[field.name] = { locale: field.locale }
    }
    return sort
  }
  const [sort, setSort] = useState<SortType>(convertFieldsToSort(fields))

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

  const renderFieldSortButtons = (): Array<ReactElement> => {
    return fields.map((field) => {
      const optionName = field.name + toArrow(sort[field.name]?.direction)
      const handler = (): void => {
        setSort((previous) => {
          const nextSort = { ...previous }
          const fieldSort = nextSort[field.name] ?? {}
          nextSort[field.name] = { ...fieldSort }
          nextSort[field.name].direction = flipDirection(fieldSort.direction)
          return nextSort
        })
      }

      return (
        <button key={field.name} onClick={handler} className={s.btn}>
          {optionName}
        </button>
      )
    })
  }

  return (
    <div className={s.sortcontainer}>
      <button key={'default'} onClick={() => setSort(convertFieldsToSort(fields))} className={s.sortbutton}>
        Default
      </button>
      {renderFieldSortButtons()}
    </div>
  )
}
