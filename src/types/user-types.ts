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

  shippingID: T
  shippingCountry: T
  shippingCity: T
  shippingPostalCode: T
  shippingStreet: T

  billingID: T
  billingCountry: T
  billingCity: T
  billingPostalCode: T
  billingStreet: T

  defaultShipping: T
  defaultBilling: T
}
