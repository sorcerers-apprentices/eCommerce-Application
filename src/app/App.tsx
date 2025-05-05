import { type ReactElement } from 'react'
import AppRouter from '@/app/providers/router/AppRouter'

function App(): ReactElement {
  return (
    <div className="container">
      <AppRouter />
    </div>
  )
}

export default App
