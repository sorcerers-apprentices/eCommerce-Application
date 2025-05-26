import type { Customer } from '@commercetools/platform-sdk'
import type { TCustomerProfileForm } from '@/types/user-types'

const EMPTY_PROFILE: TCustomerProfileForm<string> = {
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  password: '',
  shippingCountry: '',
  shippingCity: '',
  shippingPostalCode: '',
  shippingStreet: '',
  defaultShipping: '',
  billingCountry: '',
  billingCity: '',
  billingPostalCode: '',
  billingStreet: '',
  defaultBilling: '',
}

export const ProfileMapper = {
  EMPTY_PROFILE,
  toProfileView(customer: Customer): TCustomerProfileForm<string> {
    const shipping = customer.addresses?.[0] ?? {}
    const billing = customer.addresses?.[1] ?? {}
    const defaultShippingAddressId = customer.defaultShippingAddressId
    const defaultBillingAddressId = customer.defaultBillingAddressId

    return {
      email: customer.email ?? '',
      firstName: customer.firstName ?? '',
      lastName: customer.lastName ?? '',
      dateOfBirth: customer.dateOfBirth ?? '',
      password: '',
      shippingCountry: shipping.country ?? '',
      shippingCity: shipping.city ?? '',
      shippingPostalCode: shipping.postalCode ?? '',
      shippingStreet: shipping.streetName ?? '',
      defaultShipping: defaultShippingAddressId ?? '',
      billingCountry: billing.country ?? '',
      billingCity: billing.city ?? '',
      billingPostalCode: billing.postalCode ?? '',
      billingStreet: billing.streetName ?? '',
      defaultBilling: defaultBillingAddressId ?? '',
    }
  },
}
