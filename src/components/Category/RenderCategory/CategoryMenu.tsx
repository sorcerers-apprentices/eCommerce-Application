import s from '@/components/Category/Category.module.scss'
import type { Category } from '@commercetools/platform-sdk'
import { type MouseEvent, type ReactElement, useState } from 'react'

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

  const handleCategoryClick =
    (category: Category) =>
    (event: MouseEvent): void => {
      event.stopPropagation()

      setSelectedCategoryIds((previous) =>
        previous.includes(category.id) ? previous.filter((id) => id !== category.id) : [...previous, category.id]
      )

      onCategoryClick(category.id)
    }

  const renderCategory = (category: Category): ReactElement => {
    const children = findDirectChildren(category)
    return (
      <li
        onClick={handleCategoryClick(category)}
        style={{
          backgroundColor: selectedCategoryIds.includes(category.id) ? '#839980' : 'transparent',
        }}
      >
        {category.name['en']}
        {children && <ul>{children.map((child) => renderCategory(child))}</ul>}
      </li>
    )
  }

  return <ul className={`${s.categorylist}`}>{findRootCategories()?.map((category) => renderCategory(category))}</ul>
}
