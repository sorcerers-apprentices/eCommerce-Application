import type { ReactElement } from 'react'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'
import { AboutPageAsync } from '@/pages/AboutPage/AboutPage.async'
import { ProfilePageAsync } from '@/pages/ProfilePage/ProfilePage.async'
import { RegistrationPageAsync } from '@/pages/RegistrationPage/RegistrationPage.async'

type RoutePropertiesType = {
  path: RoutePath
  element: ReactElement
  onlyAuth?: boolean
}

export enum RoutePath {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  PROFILE = '/profile',
  ABOUT = '/about',
  NOT_FOUND = '*',
}

export const routeConfig: RoutePropertiesType[] = [
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
    onlyAuth: true,
  },
  {
    path: RoutePath.ABOUT,
    element: <AboutPageAsync />,
  },
  {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
]
