import s from '../Category.module.scss'
import { useSearchParams } from 'react-router-dom'
import type { Category } from '@commercetools/platform-sdk'
import { type MouseEvent, type ReactElement, useEffect, useState, useRef } from 'react'

type CategoryMenuProperties = {
  categories: Array<Category> | undefined
  onCategoryClick: (id: string) => void
}

export const CategoryMenu = ({ categories, onCategoryClick }: CategoryMenuProperties): ReactElement => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Array<string>>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!categories) return

    const matchingIds = getMatchingCategoryIds(categories, searchParams)
    setSelectedCategoryIds(matchingIds)

    if (!initializedRef.current) {
      matchingIds.forEach((id) => onCategoryClick(id))
      initializedRef.current = true
    }
  }, [categories, searchParams, onCategoryClick])

  const findRootCategories = (): Array<Category> | undefined =>
    categories?.filter((category) => category.parent === undefined)
  const findDirectChildren = (parent: Category): Array<Category> | undefined =>
    categories?.filter((category: Category) => category.parent?.id === parent.id)

  const getMatchingCategoryIds = (categories: Category[], searchParams: URLSearchParams): string[] => {
    const slugs = [...searchParams.getAll('category'), ...searchParams.getAll('subcategory')].map((slug) =>
      slug.toLowerCase()
    )

    return categories
      .filter((category) => {
        const slug = category.slug['en']?.toLowerCase()
        return slug !== undefined && slugs.includes(slug)
      })
      .map((category) => category.id)
  }

  const handleCategoryClick =
    (category: Category) =>
    (event: MouseEvent): void => {
      event.stopPropagation()

      const paramName = category.parent ? 'subcategory' : 'category'
      const slug = category.slug['en']?.toLowerCase()
      if (!slug) return

      setSelectedCategoryIds((prev) =>
        prev.includes(category.id) ? prev.filter((id) => id !== category.id) : [...prev, category.id]
      )

      const newParams = updateSearchParams(searchParams, paramName, slug)
      setSearchParams(newParams, { replace: true })

      onCategoryClick(category.id)
    }

  const updateSearchParams = (currentParams: URLSearchParams, paramName: string, slug: string): URLSearchParams => {
    const newParams = new URLSearchParams(currentParams.toString())

    const current = newParams.getAll(paramName)
    const updated = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]

    newParams.delete(paramName)
    updated.forEach((item) => newParams.append(paramName, item))

    return newParams
  }

  const renderCategory = (category: Category): ReactElement => {
    const children = findDirectChildren(category)
    return (
      <li
        onClick={handleCategoryClick(category)}
        key={category.id}
        style={{
          color: selectedCategoryIds.includes(category.id) ? 'black' : 'white',
        }}
      >
        {category.name['en']}
        {children && <ul>{children.map((child) => renderCategory(child))}</ul>}
      </li>
    )
  }

  return <ul className={`${s.categorylist}`}>{findRootCategories()?.map((category) => renderCategory(category))}</ul>
}
