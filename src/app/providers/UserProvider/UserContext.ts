import { createContext } from 'react'
import { userState, type UserStateType } from './UserState'

export type UserContextType = {
  user: UserStateType
  setUser: (newUser: UserStateType) => void
}

export const UserContext = createContext<UserContextType>({
  user: userState,
  setUser: (): void => {},
})
