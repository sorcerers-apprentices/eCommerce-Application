import type { CategoryItem } from '@/components/Category/Categaries.ts'
import { type FC, type MouseEvent } from 'react'

export const RenderCategory: FC<{
  category: CategoryItem
  parentPath?: string
  onCategoryClick: (path: string) => void
}> = ({ category, parentPath = '', onCategoryClick }) => {
  const currentPath = parentPath ? `${parentPath}-${category.name}` : category.name

  return (
    <li
      onClick={(event: MouseEvent) => {
        event.stopPropagation()
        onCategoryClick(currentPath)
      }}
    >
      {category.name}
      {category.children && (
        <ul>
          {category.children.map((child, index) => (
            <RenderCategory
              key={`${currentPath}-${index}`}
              category={child}
              parentPath={currentPath}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
