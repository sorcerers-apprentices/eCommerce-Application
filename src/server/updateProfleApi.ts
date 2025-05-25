import type { TCustomerProfileForm } from '@/components/types/user-types'
import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk'
import { builder } from './client'

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
