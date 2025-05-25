import { useEffect, useState, type ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { Button } from '@/shared/ui/Button/Button'
import { Form } from '@/shared/ui/Form/Form'

import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import s from './ProfileSection.module.scss'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import type { TCustomerProfileForm } from '@/components/types/user-types'
import { UserDataView } from './UserDataView/UserDataView'
import { ProfileMapper } from '@/shared/lib/ProfileMapper'

export const ProfileSection = (): ReactElement => {
  const { data, error, loading } = useFetch<ClientResponse<Customer>>(api.user.fetchMe)
  const [edition, setEdition] = useState(false)
  const [userData, setUserData] = useState<TCustomerProfileForm<string>>(ProfileMapper.EMPTY_PROFILE)
  useEffect(() => {
    if (data) {
      const profileView = ProfileMapper.toProfileView(data.body)
      setUserData(profileView)
    }
  }, [data])

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
                <Form>
                  <UserDataView userData={userData} disabled={!edition} />
                  <Button onClick={() => setEdition(true)}>Edit</Button>
                </Form>
              ) : (
                <Form>
                  <UserDataView userData={userData} disabled={!edition} />

                  <div className={s.buttons}>
                    <Button onClick={() => setEdition(false)}>Cancel</Button>
                    <Button onClick={() => setEdition(false)} disabled={edition}>
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
