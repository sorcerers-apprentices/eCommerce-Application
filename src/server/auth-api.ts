import {
  createAnonymousRequestBuilder,
  createPasswordRequestBuilder,
  createRefreshBuilder,
  createRegistrationRequestBuilder,
  tokenCache,
  tokenCacheKey,
} from '@/server/client'
import type { ClientResponse } from '@commercetools/platform-sdk'
import type { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer'
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import { environment } from '@/app/types/environment.ts'

let anonymousBuilder: ByProjectKeyRequestBuilder = createAnonymousRequestBuilder()
let refreshBuilder: ByProjectKeyRequestBuilder | undefined

export const builder = (): ByProjectKeyRequestBuilder => refreshBuilder || anonymousBuilder

export type RegistrationParameters = {
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  password: string

  shippingStreet: string
  shippingCity: string
  shippingCountry: string
  shippingPostalCode: string

  billingStreet: string
  billingCity: string
  billingCountry: string
  billingPostalCode: string

  defaultShippingAddress?: number
  defaultBillingAddress?: number
}

export const authApi = {
  register: async (parameters: RegistrationParameters): Promise<ClientResponse<CustomerSignInResult>> => {
    const registrationBuilder = createRegistrationRequestBuilder()
    await registrationBuilder
      .me()
      .signup()
      .post({
        body: {
          email: parameters.email,
          firstName: parameters.firstName,
          lastName: parameters.lastName,
          dateOfBirth: parameters.dateOfBirth,
          addresses: [
            {
              streetName: parameters.shippingStreet,
              city: parameters.shippingCity,
              postalCode: parameters.shippingPostalCode,
              country: parameters.shippingCountry,
            },
            {
              streetName: parameters.billingStreet,
              city: parameters.billingCity,
              postalCode: parameters.billingPostalCode,
              country: parameters.billingCountry,
            },
          ],
          defaultShippingAddress: parameters.defaultShippingAddress,
          defaultBillingAddress: parameters.defaultBillingAddress,
          password: parameters.password,
        },
      })
      .execute()
    return authApi.authenticate(parameters.email, parameters.password)
  },
  authenticate: async (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
    const passwordBuilder = createPasswordRequestBuilder(email, password)
    const authenticationResult = await passwordBuilder
      .me()
      .login()
      .post({
        body: { email, password },
      })
      .execute()
    refreshBuilder = createRefreshBuilder()
    return authenticationResult
  },
  logout: async (): Promise<void> => {
    const refreshToken = tokenCache.get().refreshToken
    if (refreshToken) {
      await fetch(`${environment.AUTH_URL}/oauth/token/revoke`, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: refreshToken,
        }),
      })
    }
    refreshBuilder = undefined
    localStorage.removeItem(tokenCacheKey)
    anonymousBuilder = createAnonymousRequestBuilder()
  },
}
