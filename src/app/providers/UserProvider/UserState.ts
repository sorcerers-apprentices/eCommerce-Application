export type UserStateType = {
  isAuth: boolean
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  street: string
  city: string
  postalCode: string
  country: string
}

export const userState: UserStateType = {
  isAuth: false,
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
}
