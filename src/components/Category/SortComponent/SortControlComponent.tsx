import { type ReactElement, useEffect, useState } from 'react'
import s from './SortComponent.module.scss'

enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export type Field = {
  name: string
  locale?: string
}

export type Sort = { [field: string]: { locale?: string; direction?: Direction } }

type SortControlProperties = {
  fields: Array<Field>
  onSortChange: (sort: Sort) => void
}

export const SortControlComponent = ({ fields, onSortChange }: SortControlProperties): ReactElement => {
  const convertFieldsToSort = (fields: Array<Field>): Sort => {
    const sort: Sort = {}
    for (const field of fields) {
      sort[field.name] = { locale: field.locale }
    }
    return sort
  }

  const [sort, setSort] = useState<Sort>(convertFieldsToSort(fields))

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

  return (
    <div className={s.sortcontainer}>
      <button key={'default'} onClick={() => setSort(convertFieldsToSort(fields))} className={s.sortbutton}>
        Default
      </button>
      {fields.map((field) => {
        const optionName = field.name + toArrow(sort[field.name]?.direction)
        const handler = (): void => {
          setSort((previous) => {
            const sort = { ...previous }
            const fieldSort = sort[field.name] ?? {}
            sort[field.name] = { ...fieldSort }
            sort[field.name].direction = flipDirection(fieldSort?.direction)
            return sort
          })
        }
        return (
          <button key={field.name} onClick={handler} className={s.btn}>
            {optionName}
          </button>
        )
      })}
    </div>
  )
}
