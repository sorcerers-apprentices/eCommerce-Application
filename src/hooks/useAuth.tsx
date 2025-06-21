import { toast } from 'react-hot-toast'
import { authApi } from '@/server/auth-api'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@/hooks/useUserContext'
import { useCartContext } from '@/hooks/useCartContext'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { CartAction } from '@/app/providers/CartProvider/CartReducer'
import { UserActionType } from '@/app/providers/UserProvider/UserReducer'

type AuthContextOperations = {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = (): AuthContextOperations => {
  const { dispatch: userDispatch } = useUserContext()
  const { dispatch: cartDispatch } = useCartContext()
  const navigate = useNavigate()

  const login = async (username: string, password: string): Promise<void> => {
    const authPromise = authApi.authenticate(username, password)
    const result = await toast.promise(authPromise, {
      loading: 'Loading',
      success: 'Successfully logged in',
      error: 'Login failed',
    })
    const cart = result?.body?.cart
    const total = cart?.totalLineItemQuantity ?? 0
    userDispatch({ type: UserActionType.LOGIN, payload: { email: result.body.customer.email } })
    cartDispatch({ type: CartAction.SET_CART_ID, payload: { id: cart?.id } })
    cartDispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: total } })
  }

  const logout = async (): Promise<void> => {
    const logoutPromise = authApi.logout()
    userDispatch({ type: UserActionType.LOGOUT })
    await toast.promise(logoutPromise, {
      loading: 'Loading',
      success: 'You have been logged out',
      error: 'Logout failed',
    })
    cartDispatch({ type: CartAction.SET_CART_ID, payload: { id: undefined } })
    cartDispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: 0 } })
    navigate(RoutePath.MAIN)
  }

  return { login, logout }
}
