import { useUser } from '@/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { UserAction } from '@/app/providers/UserProvider/UserReducer'

type UseAuthType = {
  login: (username: string) => void
  logout: () => void
}

export const useAuth = (): UseAuthType => {
  const { dispatch } = useUser()
  const navigate = useNavigate()

  const login = (username: string): void => {
    dispatch({ type: UserAction.LOGIN, payload: { username } })
    navigate(RoutePath.MAIN)
  }

  const logout = (): void => {
    dispatch({ type: UserAction.LOGOUT })
  }

  return { login, logout }
}
