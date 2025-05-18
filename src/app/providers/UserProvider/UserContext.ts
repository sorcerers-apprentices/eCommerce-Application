import { createContext, type Dispatch } from 'react'

export type UserContext = {
  state: UserState
  dispatch: Dispatch<UserAction>
}

export type UserState = {
  email?: string
}

export type UserAction = SetUser | UpdateUser | LoginUser | LogoutUser

export enum UserActionType {
  SET_ALL = 'SET_ALL',
  UPDATE = 'UPDATE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type SetUser = {
  type: UserActionType.SET_ALL
  payload: UserState
}

type UpdateUser = {
  type: UserActionType.UPDATE
  payload: UserState
}

type LoginUser = {
  type: UserActionType.LOGIN
  payload: { email: string }
}

type LogoutUser = {
  type: UserActionType.LOGOUT
}

export const userContext = createContext<UserContext>({
  state: {},
  dispatch: (): void => {},
})
