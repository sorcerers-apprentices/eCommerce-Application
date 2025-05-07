import type { ReactElement } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import './ErrorPage.scss'

const ErrorPage = (): ReactElement => {
  const refreshPage = (): void => {
    location.reload()
  }

  return (
    <div className="container section section-dog error-page">
      <h2>There was an error in the application</h2>
      <Button onClick={refreshPage}>Refresh the page</Button>
    </div>
  )
}

export default ErrorPage
