import { api } from '@/server/api'
import { toast } from 'react-hot-toast'
import { isAnonymous } from '@/server/client'
import { useFetch } from '@/shared/hooks/useFetch'
import { userContext, type UserState } from './UserContext'
import { UserActionType, userReducer } from './UserReducer'
import { type JSX, type ProviderProps, useReducer } from 'react'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'

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

  return <userContext.Provider value={{ state, dispatch, loading }}>{children}</userContext.Provider>
}
