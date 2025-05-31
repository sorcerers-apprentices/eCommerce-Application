import type { RouteProps } from 'react-router-dom'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'
import { AboutPageAsync } from '@/pages/AboutPage/AboutPage.async'
import { ProfilePageAsync } from '@/pages/ProfilePage/ProfilePage.async'
import { ProductPageAsync } from '@/pages/ProductPage/ProductPage.async'
import { CatalogPageAsync } from '@/pages/CatalogPage/CatalogPage.async'
import { RegistrationPageAsync } from '@/pages/RegistrationPage/RegistrationPage.async'
import { AddressesPageAsync } from '@/pages/AddressesPage/AddressesPage.async'
import { PasswordPageAsync } from '@/pages/PasswordPage/PasswordPage.async'

export enum RoutePath {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  PROFILE = '/profile',
  ADDRESSES = '/profile/addresses',
  PASSWORD = '/profile/password',
  ABOUT = '/about',
  PRODUCT = '/product/:id',
  CATALOG = '/catalog',
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
    path: RoutePath.PRODUCT,
    element: <ProductPageAsync />,
  },
  {
    path: RoutePath.CATALOG,
    element: <CatalogPageAsync />,
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
  {
    path: RoutePath.ADDRESSES,
    element: <AddressesPageAsync />,
  },
  {
    path: RoutePath.PASSWORD,
    element: <PasswordPageAsync />,
  },
]
