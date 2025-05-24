import { type UserState } from './UserContext'

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
  payload: Partial<UserState>
}

type LoginUser = {
  type: UserActionType.LOGIN
  payload: { email: string }
}

type LogoutUser = {
  type: UserActionType.LOGOUT
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionType.SET_ALL:
      return { ...action.payload }
    case UserActionType.UPDATE:
      return { ...state, ...action.payload }
    case UserActionType.LOGIN:
      return { ...state, ...action.payload }
    case UserActionType.LOGOUT:
      return { ...state, email: undefined }
    default:
      return { ...state }
  }
}
