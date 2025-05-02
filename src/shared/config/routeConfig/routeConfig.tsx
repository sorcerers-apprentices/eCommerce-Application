import type { RouteProps } from 'react-router-dom'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'

enum RoutePath {
  MAIN = '/',
  LOGIN = '/login',
}

export const routeConfig: RouteProps[] = [
  {
    path: RoutePath.MAIN,
    element: <MainPageAsync />,
  },
  {
    path: RoutePath.LOGIN,
    element: <LoginPageAsync />,
  },
]
