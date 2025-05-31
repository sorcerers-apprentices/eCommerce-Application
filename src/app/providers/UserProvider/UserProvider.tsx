import { api } from '@/server/api'
import { toast } from 'react-hot-toast'
import { isAnonymous } from '@/server/client'
import { useFetch } from '@/shared/hooks/useFetch'
import { userContext, type UserState } from './UserContext'
import { UserActionType, userReducer } from './UserReducer'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import { type JSX, type ProviderProps, useCallback, useMemo, useReducer } from 'react'

export const UserProvider = ({ value, children }: Partial<ProviderProps<UserState>>): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, value || {})

  const fetchSuccess = useCallback(
    (data: ClientResponse<Customer>) => {
      const email = data.body.email
      if (email) {
        dispatch({ type: UserActionType.UPDATE, payload: { email } })
      }
    },
    [dispatch]
  )

  const fetchFailure = useCallback(() => {
    toast.error('Authorization failed')
    dispatch({ type: UserActionType.UPDATE, payload: { email: undefined } })
  }, [dispatch])

  const fetchOptions = useMemo(
    () => ({
      enabled: !isAnonymous(),
      onSuccess: fetchSuccess,
      onFailure: fetchFailure,
    }),
    [fetchSuccess, fetchFailure]
  )

  const { loading } = useFetch<ClientResponse<Customer>>(api.user.fetchMe, fetchOptions)

  return <userContext.Provider value={{ state, dispatch, loading }}>{children}</userContext.Provider>
}
