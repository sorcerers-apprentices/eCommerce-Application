import { toast } from 'react-hot-toast'
import { authApi } from '@/server/auth-api'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@/hooks/useUserContext'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { UserActionType } from '@/app/providers/UserProvider/UserReducer'

type AuthContextOperations = {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = (): AuthContextOperations => {
  const { dispatch } = useUserContext()
  const navigate = useNavigate()

  const login = async (username: string, password: string): Promise<void> => {
    const authPromise = authApi.authenticate(username, password)
    const result = await toast.promise(authPromise, {
      loading: 'Loading',
      success: 'Successfully logged in',
      error: 'Login failed',
    })
    dispatch({ type: UserActionType.LOGIN, payload: { email: result.body.customer.email } })
    navigate(RoutePath.MAIN)
  }

  const logout = async (): Promise<void> => {
    const logoutPromise = authApi.logout()
    dispatch({ type: UserActionType.LOGOUT })
    await toast.promise(logoutPromise, {
      loading: 'Loading',
      success: 'You have been logged out',
      error: 'Logout failed',
    })
  }

  return { login, logout }
}
