import {
  builder,
  createPasswordRequestBuilder,
  createRegistrationRequestBuilder,
  getRefreshToken,
  resetClients,
} from '@/server/client'
import type { ClientResponse } from '@commercetools/platform-sdk'
import type { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer'
import { environment } from '@/app/types/environment.ts'

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
    resetClients()
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
    // use anonymous builder to merge carts
    await builder()
      .me()
      .login()
      .post({
        body: {
          email,
          password,
          activeCartSignInMode: 'MergeWithExistingCustomerCart',
        },
      })
      .execute()

    resetClients()
    // fetch me to trigger authentication to get authenticated token
    const passwordBuilder = createPasswordRequestBuilder(email, password)
    return await passwordBuilder
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute()
  },
  logout: async (): Promise<void> => {
    const refreshToken = getRefreshToken()
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
    resetClients()
  },
}

//{"token":"vV9n0RwrH7AFCxD2wa-j6PDHGElwKB_I","expirationTime":1749769944739,"refreshToken":"sorcerers-apprentices:cz-B4NnlolZjb4O0uMieVzExZthIybQEpAitFvYAhjo"}
//{"token":"trerDbDdNWTgzt-Y2eNQINYRl-KX5g_-","expirationTime":1749932029960,"refreshToken":"sorcerers-apprentices:qvKTNiOJiOTek1rFfFx5lp01uoaL86gzy06QZcE0YGM"}
