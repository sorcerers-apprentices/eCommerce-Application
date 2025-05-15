import { useUser } from '@/hooks/useUser'
import Loader from '@/shared/ui/Loader/Loader'
import { type ReactElement, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routeConfig, RoutePath } from '@/shared/config/routeConfig/routeConfig'

const AppRouter = (): ReactElement => {
  const { state } = useUser()

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routeConfig.map(({ path, element, onlyAuth, onlyGuest }) => {
          let page = element

          if (onlyAuth && !state.isAuth) {
            page = <Navigate to={RoutePath.LOGIN} replace />
          } else if (onlyGuest && state.isAuth) {
            page = <Navigate to={RoutePath.MAIN} replace />
          }

          return <Route path={path} element={page} />
        })}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
