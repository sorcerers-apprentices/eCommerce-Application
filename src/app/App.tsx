import { type ReactElement } from 'react'
import AppRouter from '@/app/providers/router/AppRouter'
import { UserProvider } from '@/app/providers/UserProvider/UserProvider'
import { ProductsProvider } from '@/app/providers/ProductsProvider/ProductsProvider'

function App(): ReactElement {
  return (
    <div className="container">
      <UserProvider>
        <ProductsProvider>
          <AppRouter />
        </ProductsProvider>
      </UserProvider>
    </div>
  )
}

export default App
