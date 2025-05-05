import type { RouteProps } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'
import { ProfilePageAsync } from '@/pages/ProfilePage/ProfilePage.async'
import { RegisterPageAsync } from '@/pages/RegisterPage/RegisterPage.async'

export enum RoutePath {
  MAIN = '/',
  LOGIN = '/login',
  PROFILE = '/profile',
  REGISTER = '/register',
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
    path: RoutePath.PROFILE,
    element: <ProfilePageAsync />,
  },
  {
    path: RoutePath.REGISTER,
    element: <RegisterPageAsync />,
  },
  {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
]
