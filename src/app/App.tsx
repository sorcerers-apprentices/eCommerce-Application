import { type ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRouter from '@/app/providers/AppRouter/AppRouter'
import { UserProvider } from '@/app/providers/UserProvider/UserProvider'
import { CartProvider } from '@/app/providers/CartProvider/CartProvider'

function App(): ReactElement {
  return (
    <div className="container">
      <UserProvider>
        <CartProvider>
          <AppRouter />
          <Toaster position="top-center" />
        </CartProvider>
      </UserProvider>
    </div>
  )
}

export default App
