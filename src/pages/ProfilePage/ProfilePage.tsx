import { Header } from '@/components/Header/Header'
import { ProfileSection } from '@/components/ProfileSection/ProfileSection'
import type { ReactElement } from 'react'

const ProfilePage = (): ReactElement => {
  return (
    <>
      <Header />
      <ProfileSection />
    </>
  )
}

export default ProfilePage
