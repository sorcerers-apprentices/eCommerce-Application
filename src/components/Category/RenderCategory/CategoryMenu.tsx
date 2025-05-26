import { type MouseEvent, type ReactElement, useState } from 'react'
import type { Category } from '@commercetools/platform-sdk'
import s from '@/components/Category/Category.module.scss'

type CategoryMenuProperties = {
  categories: Array<Category> | undefined
  onCategoryClick: (id: string) => void
}

export const CategoryMenu = ({ categories, onCategoryClick }: CategoryMenuProperties): ReactElement => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Array<string>>([])

  const findRootCategories = (): Array<Category> | undefined =>
    categories?.filter((category) => category.parent === undefined)
  const findDirectChildren = (parent: Category): Array<Category> | undefined =>
    categories?.filter((category: Category) => category.parent?.id === parent.id)

  const renderCategory = (category: Category): ReactElement => {
    const children = findDirectChildren(category)
    return (
      <li
        onClick={(event: MouseEvent) => {
          event.stopPropagation()
          setSelectedCategoryIds((previous) => {
            if (previous.includes(category.id)) {
              return [...previous.filter((categoryId) => categoryId !== category.id)]
            } else {
              return [...previous, category.id]
            }
          })
          onCategoryClick(category.id)
        }}
        style={{ backgroundColor: selectedCategoryIds.includes(category.id) ? '#839980' : 'transparent' }}
      >
        {category.name['en']}
        {children && <ul>{children.map((child) => renderCategory(child))}</ul>}
      </li>
    )
  }

  return <ul className={`${s.categorylist}`}>{findRootCategories()?.map((category) => renderCategory(category))}</ul>
}
