import { type ReactElement } from 'react'
import AppRouter from '@/app/providers/router/AppRouter'
import { Header } from '@/components/Header/Header'

function App(): ReactElement {
  return (
    <div className="container">
      <Header />
      <AppRouter />
    </div>
  )
}
export default App
