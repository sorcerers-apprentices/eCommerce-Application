import type { ReactElement } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import s from './ErrorPage.module.scss'

const ErrorPage = (): ReactElement => {
  const refreshPage = (): void => {
    location.reload()
  }

  return (
    <div className={['section-dog', s.page].join(' ')}>
      <h1 className={s.title}>Error</h1>
      <h2 className={s.description}>There was an error in the application</h2>
      <Button onClick={refreshPage}>Refresh the page</Button>
    </div>
  )
}

export default ErrorPage
