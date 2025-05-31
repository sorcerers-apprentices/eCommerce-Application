import type { Customer } from '@commercetools/platform-sdk'

export type TAddressMapped = {
  id: string
  street: string
  postalCode: string
  city: string
  country: string
  defaultShipping: boolean
  shipping: boolean
  defaultBilling: boolean
  billing: boolean
}

const countryCodeToName: Record<string, string> = {
  UK: 'United Kingdom',
  PL: 'Poland',
  ES: 'Spain',
}

export const EMPTY_ADDRESS = {
  id: '',
  street: '',
  postalCode: '',
  city: '',
  country: '',
  shipping: false,
  billing: false,

  defaultShipping: false,
  defaultBilling: false,
}

export const AddressMapper = {
  EMPTY_ADDRESS,

  toAddressView(customer: Customer): TAddressMapped[] {
    const {
      addresses = [],
      defaultShippingAddressId,
      shippingAddressIds = [],
      defaultBillingAddressId,
      billingAddressIds = [],
    } = customer

    return addresses.map((address) => ({
      id: address.id ?? '',
      street: address.streetName ?? '',
      postalCode: address.postalCode ?? '',
      city: address.city ?? '',
      country: (countryCodeToName[address.country] || address.country) ?? '',

      shipping: address.id ? shippingAddressIds.includes(address.id) : false,
      billing: address.id ? billingAddressIds.includes(address.id) : false,

      defaultShipping: address.id === defaultShippingAddressId,
      defaultBilling: address.id === defaultBillingAddressId,
    }))
  },
}
