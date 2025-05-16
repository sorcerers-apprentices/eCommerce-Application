import { toast } from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { UserAction } from '@/app/providers/UserProvider/UserReducer'
import { authApi } from '@/server/auth-api.ts'

type AuthContextOperations = {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = (): AuthContextOperations => {
  const { dispatch } = useUser()
  const navigate = useNavigate()

  const login = async (username: string, password: string): Promise<void> => {
    await authApi.authenticate(username, password)
    dispatch({ type: UserAction.LOGIN, payload: { username } })
    navigate(RoutePath.MAIN)
    toast.success('Successfully logged in')
  }

  const logout = async (): Promise<void> => {
    await authApi.logout()
    dispatch({ type: UserAction.LOGOUT })
    toast.success('You have been logged out')
  }

  return { login, logout }
}
