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
        {routeConfig.map(({ path, element, onlyAuth }) => {
          const page = onlyAuth && !state.isAuth ? <Navigate to={RoutePath.LOGIN} replace /> : element

          return <Route path={path} element={page} />
        })}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
