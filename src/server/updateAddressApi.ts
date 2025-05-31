import type { TCustomerProfileForm } from '@/types/user-types'
import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk'
import { builder } from './client'

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
export const updateAddressApi = async (userData: TCustomerProfileForm<string>): Promise<Customer> => {
  const me = await builder().me().get().execute()
  const actions: MyCustomerUpdateAction[] = []

  if (userData.shippingID) {
    actions.push({
      action: 'changeAddress',
      addressId: userData.shippingID,
      address: {
        streetName: userData.shippingStreet,
        postalCode: userData.shippingPostalCode,
        city: userData.shippingCity,
        country: convertCountryToCode(userData.shippingCountry),
      },
    })
  }

  if (userData.billingID) {
    actions.push({
      action: 'changeAddress',
      addressId: userData.billingID,
      address: {
        streetName: userData.billingStreet,
        postalCode: userData.billingPostalCode,
        city: userData.billingCity,
        country: convertCountryToCode(userData.billingCountry),
      },
    })
  }
  if (userData.defaultShipping) {
    actions.push({
      action: 'setDefaultShippingAddress',
      ...(userData.defaultShipping ? { addressId: userData.defaultShipping } : {}),
    })
  } else {
    actions.push({
      action: 'removeShippingAddressId',
      addressId: userData.shippingID,
    })
  }

  if (userData.defaultBilling) {
    actions.push({
      action: 'setDefaultBillingAddress',
      ...(userData.defaultBilling ? { addressId: userData.defaultBilling } : {}),
    })
  } else {
    actions.push({
      action: 'removeBillingAddressId',
      addressId: userData.billingID,
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
