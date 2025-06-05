import { type ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRouter from '@/app/providers/AppRouter/AppRouter'
import { UserProvider } from '@/app/providers/UserProvider/UserProvider'
import { ProductsProvider } from '@/app/providers/ProductsProvider/ProductsProvider'
import { CartProvider } from '@/app/providers/CartProvider/CartProvider.tsx'

function App(): ReactElement {
  return (
    <div className="container">
      <UserProvider>
        <CartProvider>
          <ProductsProvider>
            <AppRouter />
            <Toaster position="top-center" />
          </ProductsProvider>
        </CartProvider>
      </UserProvider>
    </div>
  )
}

export default App
