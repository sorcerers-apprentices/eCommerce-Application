import { useEffect, useState, type ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { Button } from '@/shared/ui/Button/Button'
import { Form } from '@/shared/ui/Form/Form'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import s from './ProfileSection.module.scss'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import type { TCustomerProfileForm } from '@/types/user-types'
import { UserDataView } from './UserDataView/UserDataView'
import { ProfileMapper } from '@/components/ProfileSection/ProfileMapper'
import { updateProfileApi } from '@/server/updateProfleApi'

export const ProfileSection = (): ReactElement => {
  const { data, error, loading, refetch } = useFetch<ClientResponse<Customer>>(api.user.fetchMe)
  const [edition, setEdition] = useState(false)
  const [userData, setUserData] = useState<TCustomerProfileForm<string>>(ProfileMapper.EMPTY_PROFILE)
  useEffect(() => {
    if (data) {
      const profileView = ProfileMapper.toProfileView(data.body)
      setUserData(profileView)
    }
  }, [data])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      await updateProfileApi(userData)
      refetch()
      setEdition(false)
    } catch (error) {
      console.error(error)
    }
  }
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
                <Form>
                  <UserDataView
                    userData={ProfileMapper.toProfileView(data.body)}
                    setUserData={setUserData}
                    disabled={!edition}
                  />
                  <Button onClick={() => setEdition(true)}>Edit</Button>
                  <pre>{JSON.stringify(userData, REPLACER, SPACE)}</pre>
                </Form>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <UserDataView userData={userData} setUserData={setUserData} disabled={!edition} />

                  <div className={s.buttons}>
                    <Button onClick={() => setEdition(false)}>Cancel</Button>
                    <Button type="submit" disabled={!edition}>
                      Save
                    </Button>
                  </div>
                  <pre>{JSON.stringify(data.body, REPLACER, SPACE)}</pre>
                </Form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
