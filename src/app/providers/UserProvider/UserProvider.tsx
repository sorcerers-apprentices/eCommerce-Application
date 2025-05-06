import type { JSX } from 'react'
import { userState, type UserStateType } from './UserState'
import { createContext, type ReactNode, useState } from 'react'

export type IUserContext = {
  user: UserStateType
  setUser: (newUser: UserStateType) => void
}

export const UserContext = createContext<IUserContext>({
  user: userState,
  setUser: (): void => {},
})

export function UserProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUserState] = useState<UserStateType>(userState)

  const setUser = (newUser: UserStateType): void => {
    setUserState(newUser)
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
