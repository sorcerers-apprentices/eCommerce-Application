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
export const updateProfileApi = async (userData: TCustomerProfileForm<string>): Promise<Customer> => {
  const me = await builder().me().get().execute()
  const actions: MyCustomerUpdateAction[] = []

  if (userData.email) {
    actions.push({
      action: 'changeEmail',
      email: userData.email,
    })
  }

  if (userData.firstName) {
    actions.push({
      action: 'setFirstName',
      firstName: userData.firstName,
    })
  }

  if (userData.lastName) {
    actions.push({
      action: 'setLastName',
      lastName: userData.lastName,
    })
  }

  if (userData.dateOfBirth) {
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: userData.dateOfBirth,
    })
  }

  const shippingAddressId = me.body.addresses?.[0]?.id
  if (shippingAddressId) {
    actions.push({
      action: 'changeAddress',
      addressId: shippingAddressId,
      address: {
        streetName: userData.shippingStreet,
        postalCode: userData.shippingPostalCode,
        city: userData.shippingCity,
        country: convertCountryToCode(userData.shippingCountry),
      },
    })
  }

  const billingAddressId = me.body.addresses?.[1]?.id
  if (billingAddressId) {
    actions.push({
      action: 'changeAddress',
      addressId: billingAddressId,
      address: {
        streetName: userData.billingStreet,
        postalCode: userData.billingPostalCode,
        city: userData.billingCity,
        country: convertCountryToCode(userData.billingCountry),
      },
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
