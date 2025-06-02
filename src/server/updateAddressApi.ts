import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk'
import { builder } from './client'
import type { TAddressMapped } from '@/components/Profile/AddressMapper'

const convertCountryToCode = (country: string): string => {
  switch (country) {
    case 'United Kingdom':
      return 'UK'
    case 'Poland':
      return 'PL'
    case 'Spain':
      return 'ES'
    default:
      return ''
  }
}
export const updateAddressApi = async (updatedAddresses: TAddressMapped[]): Promise<Customer> => {
  const me = await builder().me().get().execute()
  const actions: MyCustomerUpdateAction[] = []

  updatedAddresses.forEach((address) => {
    actions.push({
      action: 'changeAddress',
      addressId: address.id,
      address: {
        streetName: address.street,
        postalCode: address.postalCode,
        city: address.city,
        country: convertCountryToCode(address.country),
      },
    })
  })

  const shippingIds = updatedAddresses.filter((addresses) => addresses.shipping).map((address) => address.id)
  const billingIds = updatedAddresses.filter((addresses) => addresses.billing).map((address) => address.id)

  shippingIds.forEach((id) => {
    actions.push({
      action: 'addShippingAddressId',
      addressId: id,
    })
  })

  billingIds.forEach((id) => {
    actions.push({
      action: 'addBillingAddressId',
      addressId: id,
    })
  })

  const defaultShipping = updatedAddresses.find((a) => a.defaultShipping)
  const defaultBilling = updatedAddresses.find((a) => a.defaultBilling)

  if (defaultShipping) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressId: defaultShipping.id,
    })
  }

  if (defaultBilling) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressId: defaultBilling.id,
    })
  }

  const result = await builder()
    .me()
    .post({
      body: {
        version: me.body.version,
        actions,
      },
    })
    .execute()

  return result.body
}
