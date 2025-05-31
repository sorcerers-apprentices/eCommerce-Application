import type { JSX } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Breadcrumbs.module.scss'
import type { ReactElement } from 'react'
import type { Category } from '@commercetools/platform-sdk'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

type BreadcrumbsProps = {
  allCategories: Category[]
  currentCategory?: Category
}

const Breadcrumbs = ({ allCategories, currentCategory }: BreadcrumbsProps): ReactElement => {
  const findCategoriesPath = (category?: Category): Category[] => {
    if (!category) {
      return []
    }

    const parentRef = category.parent
    if (parentRef) {
      const parentCategory = allCategories.find((it) => it.id === parentRef.id)
      if (parentCategory) {
        return [...findCategoriesPath(parentCategory), category]
      }
    }

    return [category]
  }

  const pathCategories = findCategoriesPath(currentCategory)
  const Separator: JSX.Element = <span> &gt; </span>

  return (
    <div className={s.breadcrumb}>
      <NavLink to={RoutePath.CATALOG} className={s.link}>
        Catalog
      </NavLink>
      {Separator}

      {pathCategories.map((breadCrumbCategory, i) => {
        const isSubcategory = Boolean(breadCrumbCategory.parent)
        const slug = breadCrumbCategory.slug['en']?.toLowerCase()
        const searchParam = isSubcategory ? `subcategory=${slug}` : `category=${slug}`

        return (
          <span key={breadCrumbCategory.id}>
            <NavLink to={`${RoutePath.CATALOG}?${searchParam}`} className={s.link}>
              {breadCrumbCategory.name['en']}
            </NavLink>
            {i < pathCategories.length - 1 && Separator}
          </span>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
