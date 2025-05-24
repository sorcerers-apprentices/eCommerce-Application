import type { FC, ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '@/hooks/useUserContext'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const GuestGuard: FC = (): ReactElement => {
  const { state, loading } = useUserContext()

  if (loading) {
    return <Loader />
  }

  if (state.email) {
    return <Navigate to={RoutePath.MAIN} replace />
  }

  return <Outlet />
}

export default GuestGuard
