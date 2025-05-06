import type { JSX } from 'react'
import { UserContext } from './UserContext'
import { type ReactNode, useState } from 'react'
import { userState, type UserStateType } from './UserState'

type UserProviderProperties = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProperties): JSX.Element {
  const [user, setUserState] = useState<UserStateType>(userState)

  const setUser = (newUser: UserStateType): void => {
    setUserState(newUser)
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
