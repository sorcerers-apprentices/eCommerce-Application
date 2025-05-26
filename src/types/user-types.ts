export type TFormData = {
  value: string
  touched: boolean
}

export type TCustomerProfileForm<T> = {
  email: T
  firstName: T
  lastName: T
  dateOfBirth: T
  password: T
  shippingCountry: T
  shippingCity: T
  shippingPostalCode: T
  shippingStreet: T
  defaultShipping: T
  billingCountry: T
  billingCity: T
  billingPostalCode: T
  billingStreet: T
  defaultBilling: T
}
