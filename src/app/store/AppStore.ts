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

export type ProductsStateType = {
  someProducts: []
}

type StoreType = {
  user: UserStateType
  products: ProductsStateType
}

export const store: StoreType = {
  user: {
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
  },
  products: {
    someProducts: [],
  },
}
