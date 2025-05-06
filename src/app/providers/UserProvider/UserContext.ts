import { createContext } from 'react'
import { userState, type UserStateType } from './UserState'

export type IUserContext = {
  user: UserStateType
  setUser: (newUser: UserStateType) => void
}

export const UserContext = createContext<IUserContext>({
  user: userState,
  setUser: (): void => {},
})
