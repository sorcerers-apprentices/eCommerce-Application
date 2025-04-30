import { Button } from '@/shared/ui/button'
import type { ReactElement } from 'react'

export const LoginPageButton = (): ReactElement => {
  const handleClick = (): void => {
    // Handle button click
  }
  return (
    <Button type="button" onClick={handleClick} className={['btn-nav']}>
      Login Page
    </Button>
  )
}
