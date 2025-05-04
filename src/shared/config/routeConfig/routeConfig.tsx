import type { RouteProps } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'
import { ProfilePageAsync } from '@/pages/ProfilePage/ProfilePage.async'
import { RegistrationPageAsync } from '@/pages/RegistrationPage/RegistrationPage.async'

export enum RoutePath {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  PROFILE = '/profile',
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
    path: RoutePath.REGISTRATION,
    element: <RegistrationPageAsync />,
  },
  {
    path: RoutePath.PROFILE,
    element: <ProfilePageAsync />,
  },
  {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
]
