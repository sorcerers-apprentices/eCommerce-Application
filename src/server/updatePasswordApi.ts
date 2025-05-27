import { builder } from '@/server/client'
import type { Customer } from '@commercetools/platform-sdk'

type TUpdatePasswordPayload = {
  currentPassword: string
  newPassword: string
}

export const updatePasswordApi = async ({
  currentPassword,
  newPassword,
}: TUpdatePasswordPayload): Promise<Customer> => {
  const me = await builder().me().get().execute()

  const result = await builder()
    .me()
    .password()
    .post({
      body: {
        currentPassword,
        newPassword,
        version: me.body.version,
      },
    })
    .execute()

  return result.body
}
