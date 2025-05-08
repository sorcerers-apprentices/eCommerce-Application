import {
  createAnonymousRequestBuilder,
  createPasswordRequestBuilder,
  createRefreshBuilder,
  createRegistrationRequestBuilder,
} from '@/server/client'
import type { ClientResponse } from '@commercetools/platform-sdk'
import type { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer'
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'

const anonymousBuilder: ByProjectKeyRequestBuilder = createAnonymousRequestBuilder()
let refreshBuilder: ByProjectKeyRequestBuilder | undefined

export const builder = (): ByProjectKeyRequestBuilder => refreshBuilder || anonymousBuilder

export type RegistrationParameters = {
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  street: string
  city: string
  postalCode: string
  country: string
  password: string
}

export const authApi = {
  register: async (parameters: RegistrationParameters): Promise<ClientResponse<CustomerSignInResult>> => {
    const registrationBuilder = createRegistrationRequestBuilder()
    await registrationBuilder
      .customers()
      .post({
        body: {
          email: parameters.email,
          firstName: parameters.firstName,
          lastName: parameters.lastName,
          dateOfBirth: parameters.dateOfBirth,
          addresses: [
            {
              streetName: parameters.street,
              city: parameters.city,
              postalCode: parameters.postalCode,
              country: parameters.country,
            },
          ],
          password: parameters.password,
        },
      })
      .execute()
    return authApi.authenticate(parameters.email, parameters.password)
  },
  authenticate: async (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
    const passwordBuilder = createPasswordRequestBuilder(email, password)
    const authenticationResult = passwordBuilder
      .me()
      .login()
      .post({
        body: { email, password },
      })
      .execute()
    refreshBuilder = createRefreshBuilder()
    return authenticationResult
  },
}
