import { type ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRouter from '@/app/providers/AppRouter/AppRouter'
import { UserProvider } from '@/app/providers/UserProvider/UserProvider'
import { ProductsProvider } from '@/app/providers/ProductsProvider/ProductsProvider'

function App(): ReactElement {
  return (
    <div className="container">
      <UserProvider>
        <ProductsProvider>
          <AppRouter />
          <Toaster position="top-center" />
        </ProductsProvider>
      </UserProvider>
    </div>
  )
}

export default App
