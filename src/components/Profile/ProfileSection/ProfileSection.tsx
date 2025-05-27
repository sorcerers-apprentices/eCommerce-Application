import { useEffect, useState, type ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { Button } from '@/shared/ui/Button/Button'
import { Form } from '@/shared/ui/Form/Form'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import s from './ProfileSection.module.scss'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import type { TCustomerProfileForm } from '@/types/user-types'
import { ProfileView } from './ProfileView/ProfileView'
import { ProfileMapper } from '@/components/Profile/ProfileMapper'
import { updateProfileApi } from '@/server/updateProfleApi'
import { Link } from 'react-router-dom'
import { IoMdKey } from 'react-icons/io'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import toast from 'react-hot-toast'
import { useUserContext } from '@/hooks/useUserContext'
import { UserActionType } from '@/app/providers/UserProvider/UserReducer'
//import { useAuth } from '@/hooks/useAuth'

export const ProfileSection = (): ReactElement => {
  //const { login } = useAuth()
  const { dispatch } = useUserContext()
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
      dispatch({ type: UserActionType.UPDATE, payload: { email: userData.email } })
      toast.success('Profile has been updated')
    } catch (error) {
      toast.error(`${error}Profile has not been updated`)
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
                  <ProfileView
                    userData={ProfileMapper.toProfileView(data.body)}
                    setUserData={setUserData}
                    disabled={!edition}
                  />
                  <Button onClick={() => setEdition(true)}>Edit</Button>
                  <pre style={{ textAlign: 'left' }}>{JSON.stringify(userData, REPLACER, SPACE)}</pre>
                </Form>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <ProfileView userData={userData} setUserData={setUserData} disabled={!edition} />

                  <div className={s.buttons}>
                    <Button onClick={() => setEdition(false)}>Cancel</Button>
                    <Button type="submit" disabled={!edition}>
                      Save
                    </Button>
                  </div>
                  <pre style={{ textAlign: 'left' }}>{JSON.stringify(data.body, REPLACER, SPACE)}</pre>
                </Form>
              )}
            </>
          )}
        </div>
        <Link to={RoutePath.PASSWORD}>
          <IoMdKey className={`icon ${s.password}`} />
        </Link>
      </div>
    </section>
  )
}
