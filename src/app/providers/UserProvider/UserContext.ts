import type { UserActionType } from './UserReducer'
import { createContext, type Dispatch } from 'react'
import { userState, type UserStateType } from './UserState'

export type UserContextType = {
  state: UserStateType
  dispatch: Dispatch<UserActionType>
}

const defaultDispatch: Dispatch<UserActionType> = (): void => {}

export const UserContext = createContext<UserContextType>({
  state: userState,
  dispatch: defaultDispatch,
})
