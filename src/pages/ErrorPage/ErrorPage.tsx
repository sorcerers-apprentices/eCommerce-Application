import type { ReactElement } from 'react'
import { Button } from '@/shared/ui/Button/Button'

const ErrorPage = (): ReactElement => {
  const refreshPage = (): void => {
    location.reload()
  }

  return (
    <div>
      <h2>There was an error in the application</h2>
      <Button onClick={refreshPage}>Refresh the page</Button>
    </div>
  )
}

export default ErrorPage
