import GuestGuard from './GuestGuard'
import PrivateGuard from './PrivateGuard'
import Loader from '@/shared/ui/Loader/Loader'
import { Route, Routes } from 'react-router-dom'
import { type ReactElement, Suspense } from 'react'
import { guestRoutes, privateRoutes, publicRoutes } from '@/shared/config/routeConfig/routeConfig'

const AppRouter = (): ReactElement => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}

        <Route element={<GuestGuard />}>
          {guestRoutes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
        </Route>

        <Route element={<PrivateGuard />}>
          {privateRoutes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouter
