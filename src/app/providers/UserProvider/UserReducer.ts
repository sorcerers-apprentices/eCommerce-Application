import type { UserStateType } from './UserState'

export enum UserAction {
  SET_ALL = 'SET_ALL',
  UPDATE = 'UPDATE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type UserActionType =
  | { type: UserAction.SET_ALL; payload: UserStateType }
  | { type: UserAction.UPDATE; payload: { key: keyof UserStateType; value: string | boolean } }
  | { type: UserAction.LOGIN; payload: { username: string } }
  | { type: UserAction.LOGOUT }

export const UserReducer = (state: UserStateType, action: UserActionType): UserStateType => {
  switch (action.type) {
    case UserAction.SET_ALL:
      return { ...action.payload }
    case UserAction.UPDATE:
      return { ...state, [action.payload.key]: action.payload.value }
    case UserAction.LOGIN:
      return { ...state, isAuth: true, username: action.payload.username }
    case UserAction.LOGOUT:
      return { ...state, isAuth: false, username: '' }
    default:
      return state
  }
}
