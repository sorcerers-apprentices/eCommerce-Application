import s from './ErrorPage.module.scss'
import { toast } from 'react-hot-toast'
import { Button } from '@/shared/ui/Button/Button'
import { type ReactElement, useEffect } from 'react'

const ErrorPage = (): ReactElement => {
  const refreshPage = (): void => {
    location.reload()
  }

  useEffect((): void => {
    toast.error('Application error. Please try again')
  }, [])

  return (
    <div className={['section-dog', s.page].join(' ')}>
      <h1 className={s.title}>Error</h1>
      <h2 className={s.description}>There was an error in the application</h2>
      <Button onClick={refreshPage}>Refresh the page</Button>
    </div>
  )
}

export default ErrorPage
