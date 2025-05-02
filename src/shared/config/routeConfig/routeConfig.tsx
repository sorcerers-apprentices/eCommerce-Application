import type { RouteProps } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'

export enum RoutePath {
  MAIN = '/',
  LOGIN = '/login',
  NOT_FOUND = '*',
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
  {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
]
