import { Header } from '@/components/Header/Header'
import { AddressesSection } from '@/components/Profile/AddressesSection/AddressesSection'
import type { ReactElement } from 'react'

const AddressesPage = (): ReactElement => {
  return (
    <>
      <Header />
      <AddressesSection />
    </>
  )
}

export default AddressesPage
