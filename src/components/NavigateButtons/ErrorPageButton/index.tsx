import { Button } from '@/shared/ui/button'
import type { ReactElement } from 'react'

export const MainPageButton = (): ReactElement => {
  const handleClick = (): void => {
    // Handle button click
  }
  return (
    <Button type="button" onClick={handleClick} className={['btn-nav']}>
      Main Page
    </Button>
  )
}
