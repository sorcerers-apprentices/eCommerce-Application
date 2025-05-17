import { toast } from 'react-hot-toast'
import { useUserContext } from '@/hooks/useUserContext.tsx'
import { authApi } from '@/server/auth-api'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { UserActionType } from '@/app/providers/UserProvider/UserContext.ts'

type AuthContextOperations = {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = (): AuthContextOperations => {
  const { dispatch } = useUserContext()
  const navigate = useNavigate()

  const login = async (username: string, password: string): Promise<void> => {
    const result = await authApi.authenticate(username, password)
    dispatch({ type: UserActionType.LOGIN, payload: { email: result.body.customer.email } })
    navigate(RoutePath.MAIN)
    toast.success('Successfully logged in')
  }

  const logout = async (): Promise<void> => {
    await authApi.logout()
    dispatch({ type: UserActionType.LOGOUT })
    toast.success('You have been logged out')
  }

  return { login, logout }
}
