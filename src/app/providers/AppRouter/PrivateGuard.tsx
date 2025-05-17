import { useUserContext } from '@/hooks/useUserContext.tsx'
import type { FC, ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const PrivateGuard: FC = (): ReactElement => {
  const { state } = useUserContext()

  if (!state.email) {
    return <Navigate to={RoutePath.LOGIN} replace />
  }

  return <Outlet />
}

export default PrivateGuard
