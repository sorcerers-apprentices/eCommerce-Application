import { Header } from '@/components/Header/Header'
import type { ReactElement } from 'react'
import s from './ProfilePage.module.scss'

const ProfilePage = (): ReactElement => {
  return (
    <>
      <Header />
      <h1 className={s.title}>Profile Page</h1>
    </>
  )
}

export default ProfilePage
