import { type JSX } from 'react'
import { userState } from './UserState'
import { UserContext } from './UserContext'
import { UserReducer } from './UserReducer'
import { type ReactNode, useReducer } from 'react'

type UserProviderProperties = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProperties): JSX.Element {
  const [state, dispatch] = useReducer(UserReducer, userState)

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}
