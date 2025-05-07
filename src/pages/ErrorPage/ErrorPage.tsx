import type { ReactElement } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import s from './ErrorPage.module.scss'

const ErrorPage = (): ReactElement => {
  const refreshPage = (): void => {
    location.reload()
  }

  return (
    <div className={`${s.errorPage} container section section-dog`}>
      <h2>There was an error in the application</h2>
      <Button onClick={refreshPage}>Refresh the page</Button>
    </div>
  )
}

export default ErrorPage
