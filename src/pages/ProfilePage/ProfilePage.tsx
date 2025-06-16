import { Header } from '@/components/Header/Header'
import { ProfileSection } from '@/components/Profile/ProfileSection/ProfileSection'
import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer.tsx'

const ProfilePage = (): ReactElement => {
  return (
    <>
      <Header />
      <ProfileSection />
      <Footer />
    </>
  )
}

export default ProfilePage
