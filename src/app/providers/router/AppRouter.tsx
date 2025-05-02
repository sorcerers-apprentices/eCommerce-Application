import { Route, Routes } from 'react-router-dom'
import { type ReactElement, Suspense } from 'react'
import { routeConfig } from '@/shared/config/routeConfig/routeConfig'

const AppRouter = (): ReactElement => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routeConfig.map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
