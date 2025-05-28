import type { Customer } from '@commercetools/platform-sdk'
import type { TCustomerProfileForm } from '@/types/user-types'

const EMPTY_PROFILE: TCustomerProfileForm<string> = {
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  password: '',

  shippingID: '',
  shippingCountry: '',
  shippingCity: '',
  shippingPostalCode: '',
  shippingStreet: '',

  billingID: '',
  billingCountry: '',
  billingCity: '',
  billingPostalCode: '',
  billingStreet: '',

  defaultShipping: '',
  defaultBilling: '',
}
const countryCodeToName: Record<string, string> = {
  UK: 'United Kingdom',
  PL: 'Poland',
  ES: 'Spain',
}

export const ProfileMapper = {
  EMPTY_PROFILE,
  toProfileView(customer: Customer): TCustomerProfileForm<string> {
    const shipping = customer.addresses?.[0] ?? {}
    const billing = customer.addresses?.[1] ?? {}
    const shippingAddressId = customer.shippingAddressIds?.[0] ?? ''
    const billingAddressId = customer.billingAddressIds?.[0] ?? ''

    return {
      email: customer.email ?? '',
      firstName: customer.firstName ?? '',
      lastName: customer.lastName ?? '',
      dateOfBirth: customer.dateOfBirth ?? '',
      password: '',

      shippingID: shipping.id ?? '',
      shippingCountry: countryCodeToName[shipping.country ?? ''] ?? '',
      shippingCity: shipping.city ?? '',
      shippingPostalCode: shipping.postalCode ?? '',
      shippingStreet: shipping.streetName ?? '',

      billingID: billing.id ?? '',
      billingCountry: countryCodeToName[billing.country ?? ''] ?? '',
      billingCity: billing.city ?? '',
      billingPostalCode: billing.postalCode ?? '',
      billingStreet: billing.streetName ?? '',

      defaultShipping: shippingAddressId ?? '',
      defaultBilling: billingAddressId ?? '',
    }
  },
}
