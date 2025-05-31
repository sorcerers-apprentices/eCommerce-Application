import type { UserAction } from './UserReducer'
import { createContext, type Dispatch } from 'react'

export type UserState = {
  email?: string
}

export type UserContext = {
  state: UserState
  dispatch: Dispatch<UserAction>
  loading: boolean
}

export const userContext = createContext<UserContext>({
  state: {},
  dispatch: (): void => {},
  loading: true,
})
