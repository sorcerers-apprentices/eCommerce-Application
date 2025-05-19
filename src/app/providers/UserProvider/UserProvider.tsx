import { type JSX, type ProviderProps, useReducer } from 'react'
import { UserActionType, userContext, type UserState } from './UserContext'
import { useFetch } from '@/shared/hooks/useFetch.tsx'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import { api } from '@/server/api.ts'
import { isAnonymous } from '@/server/client.ts'
import Loader from '@/shared/ui/Loader/Loader.tsx'
import { userReducer } from '@/app/providers/UserProvider/UserReducer.ts'
import { toast } from 'react-hot-toast'

export const UserProvider = ({ value, children }: Partial<ProviderProps<UserState>>): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, value || {})
  const { loading } = useFetch<ClientResponse<Customer>>(api.user.fetchMe, {
    enabled: !isAnonymous(),
    onSuccess: (data) => {
      const email = data?.body.email
      if (email) {
        dispatch({ type: UserActionType.UPDATE, payload: { email } })
      }
    },
    onFailure: () => {
      toast.error('Authorization failed')
      dispatch({ type: UserActionType.UPDATE, payload: { email: undefined } })
    },
  })

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {loading && <Loader />}
      {children}
    </userContext.Provider>
  )
}
