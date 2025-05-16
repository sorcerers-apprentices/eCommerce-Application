import { useUser } from '@/hooks/useUser'
import type { FC, ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const GuestGuard: FC = (): ReactElement => {
  const { state } = useUser()

  if (state.isAuth) {
    return <Navigate to={RoutePath.MAIN} replace />
  }

  return <Outlet />
}

export default GuestGuard
