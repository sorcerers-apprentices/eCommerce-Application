import { useEffect, useState, type ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { Button } from '@/shared/ui/Button/Button'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import s from './ProfileSection.module.scss'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import type { TCustomerProfileForm } from '@/shared/types/user-types'

export const ProfileSection = (): ReactElement => {
  const { data, error, loading } = useFetch<ClientResponse<Customer>>(api.user.fetchMe)
  const [edition, setEdition] = useState(false)
  const [userData, setUserData] = useState<TCustomerProfileForm<string>>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    shippingCountry: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingStreet: '',
    billingCountry: '',
    billingCity: '',
    billingPostalCode: '',
    billingStreet: '',
  })
  useEffect(() => {
    if (data) {
      const { email, firstName, lastName, dateOfBirth, addresses } = data.body

      const shipping = addresses?.[0] ?? {}
      const billing = addresses?.[1] ?? {}

      setUserData({
        email,
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        dateOfBirth: dateOfBirth ?? '',
        password: '',
        shippingCountry: shipping.country ?? '',
        shippingCity: shipping.city ?? '',
        shippingPostalCode: shipping.postalCode ?? '',
        shippingStreet: shipping.streetName ?? '',
        billingCountry: billing.country ?? '',
        billingCity: billing.city ?? '',
        billingPostalCode: billing.postalCode ?? '',
        billingStreet: billing.streetName ?? '',
      })
    }
  }, [data])
  const REPLACER = null
  const SPACE = 2

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.image}></div>
        <div className={s.content}>
          <h2 className="title">Profile</h2>
          {loading && <Loader />}
          {error && <div>{error.message}</div>}
          {data && (
            <>
              {!edition ? (
                <>
                  <pre>{JSON.stringify(userData, REPLACER, SPACE)}</pre>
                  <Button onClick={() => setEdition(true)}>Edit</Button>
                </>
              ) : (
                <>
                  <pre>{JSON.stringify(userData, REPLACER, SPACE)}</pre>
                  <Button onClick={() => setEdition(false)}>Save</Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
