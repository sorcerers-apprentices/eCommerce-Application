import type { RouteProps } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'
import { AboutPageAsync } from '@/pages/AboutPage/AboutPage.async'
import { ProfilePageAsync } from '@/pages/ProfilePage/ProfilePage.async'
import { RegistrationPageAsync } from '@/pages/RegistrationPage/RegistrationPage.async'

export enum RoutePath {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  PROFILE = '/profile',
  ABOUT = '/about',
  NOT_FOUND = '*',
}

export const publicRoutes: RouteProps[] = [
  {
    path: RoutePath.MAIN,
    element: <MainPageAsync />,
  },
  {
    path: RoutePath.REGISTRATION,
    element: <RegistrationPageAsync />,
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

export const guestRoutes: RouteProps[] = [
  {
    path: RoutePath.LOGIN,
    element: <LoginPageAsync />,
  },
]

export const privateRoutes: RouteProps[] = [
  {
    path: RoutePath.PROFILE,
    element: <ProfilePageAsync />,
  },
]
