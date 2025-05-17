import { type UserAction, UserActionType, type UserState } from '@/app/providers/UserProvider/UserContext.ts'

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
