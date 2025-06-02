import { useEffect, useState, type ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { Button } from '@/shared/ui/Button/Button'
import { Form } from '@/shared/ui/Form/Form'
import { useFetch } from '@/shared/hooks/useFetch'
import { ApiErrorCode } from '@/server/api'
import { api } from '@/server/api'
import s from './ProfileSection.module.scss'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import type { TCustomerProfileForm } from '@/types/user-types'
import { ProfileView } from './ProfileView/ProfileView'
import { ProfileMapper } from '@/components/Profile/ProfileMapper'
import { updateProfileApi } from '@/server/updateProfleApi'
import { Link } from 'react-router-dom'
import { IoMdKey } from 'react-icons/io'
import { TbTruckDelivery } from 'react-icons/tb'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import toast from 'react-hot-toast'
import { useUserContext } from '@/hooks/useUserContext'
import { UserActionType } from '@/app/providers/UserProvider/UserReducer'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities'

export const ProfileSection = (): ReactElement => {
  const { dispatch } = useUserContext()
  const { data, error, loading, refetch } = useFetch<ClientResponse<Customer>>(api.user.fetchMe)
  const [edition, setEdition] = useState(false)
  const [userData, setUserData] = useState<TCustomerProfileForm<string>>(ProfileMapper.EMPTY_PROFILE)
  const [isFormValid, setIsFormValid] = useState(false)
  const [serverErrors, setServerErrors] = useState<{
    email?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
  }>({})
  useEffect(() => {
    if (data) {
      const profileView = ProfileMapper.toProfileView(data.body)
      setUserData(profileView)
    }
  }, [data])

  const handleEditClick = (): void => {
    setEdition(true)
    if (data) {
      setUserData(ProfileMapper.toProfileView(data.body))
    }
    setServerErrors({})
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      await updateProfileApi(userData)
      refetch()
      setEdition(false)
      dispatch({ type: UserActionType.UPDATE, payload: { email: userData.email } })
      toast.success('Profile has been updated')
    } catch (error) {
      toast.error('Profile has not been updated')
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        const field: string | undefined = firstError.field
        switch (firstError.code) {
          case ApiErrorCode.DUPLICATE_FIELD:
            setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            break
          case ApiErrorCode.LOCKED_FIELD:
            if (field) {
              setServerErrors((previous) => ({ ...previous, [field]: firstError.message }))
            } else {
              setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            }
            break
          case ApiErrorCode.INVALID_FIELD:
            if (field) {
              setServerErrors((previous) => ({ ...previous, [field]: firstError.message }))
            } else {
              setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            }
            break
          case ApiErrorCode.REQUIRED_FIELD:
            if (field) {
              setServerErrors((previous) => ({ ...previous, [field]: firstError.message }))
            } else {
              setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            }
            break
          case ApiErrorCode.RESOURCE_NOT_FOUND:
            setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            break
        }
      }
      throw new Error(JSON.stringify(error))
    }
  }
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
                  <Button onClick={handleEditClick}>Edit</Button>
                </Form>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <ProfileView
                    userData={userData}
                    setUserData={setUserData}
                    disabled={!edition}
                    onValidationChange={setIsFormValid}
                    serverErrors={serverErrors}
                  />
                  <div className={s.buttons}>
                    <Button
                      type="button"
                      onClick={() => {
                        setEdition(false)
                        setUserData(ProfileMapper.toProfileView(data.body))
                        setServerErrors({})
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!isFormValid}>
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </>
          )}
        </div>
        <div className={s.links}>
          <Link to={RoutePath.PASSWORD}>
            <IoMdKey className={`icon ${s.password}`} />
          </Link>
          <Link to={RoutePath.ADDRESSES}>
            <TbTruckDelivery className={`icon ${s.address}`} />
          </Link>
        </div>
      </div>
    </section>
  )
}
