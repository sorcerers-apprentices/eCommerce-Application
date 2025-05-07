import {
  createAnonymousRequestBuilder,
  createLoggedRequestBuilder,
  createRegisteredRequestBuilder,
} from '@/server/client'
import type { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk'
import type { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer'
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'

/**
 *
 * The request function is the main function
 * that builds and executes the requests sent
 * to the coco backend.
 *
 * This function can be split or customized as
 * well.
 *
 * This method follow many other typescript
 * patterns to on executing requests for example
 * to add a product you can do:
 *
 * @example
 * // create a product example
 * return (
 *  apiRoot(credentials)
 *    .products()
 *    .post({
 *      body: productDraft
 *    })
 *    .execute()
 *    .catch((err: Error) => err)
 * )
 *
 * Full productDraft object can be found here ->
 * https://docs.commercetools.com/api/projects/products#productdraft
 *
 * @example
 * // create a customers
 * return (
 *  apiRoot(credentials)
 *    .products()
 *    .post({
 *      body: customerDraft
 *    })
 *    .execute()
 *    .catch((err: Error) => err)
 * )
 *
 * The full customerDraft can be found here ->
 * https://docs.commercetools.com/api/projects/customers#customerdraft
 *
 *
 * The full specification can be found here ->
 * https://docs.commercetools.com/api/
 *
 * Other examples can also be found here ->
 * https://github.com/commercetools/commercetools-sdk-typescript/tree/master/packages/platform-sdk/test/integration-tests
 */

const anonBuilder: ByProjectKeyRequestBuilder = createAnonymousRequestBuilder()
let passwordBuilder: ByProjectKeyRequestBuilder | undefined
const builder = (): ByProjectKeyRequestBuilder => passwordBuilder || anonBuilder

export enum ApiErrorCode {
  INVALID_CUSTOMER_ACCOUNT_CREDENTIALS = 'invalid_customer_account_credentials',
  DUPLICATE_FIELD = 'DuplicateField',
  LOCKED_FIELD = 'LockedField',
  INVALID_FIELD = 'InvalidField',
  REQUIRED_FIELD = 'RequiredField',
  RESOURCE_NOT_FOUND = 'ResourceNotFound',
}

type RegistrationParameters = {
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

export const api = {
  user: {
    authenticate: async (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
      passwordBuilder = createLoggedRequestBuilder(email, password)
      return builder()
        .login()
        .post({
          body: { email, password },
        })
        .execute()
    },
    register: async (parameters: RegistrationParameters): Promise<ClientResponse<CustomerSignInResult>> => {
      passwordBuilder = createRegisteredRequestBuilder()
      return builder()
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
    },
  },
  product: {
    fetchProducts: async (): Promise<ClientResponse<ProductProjectionPagedSearchResponse> | Error> => {
      return builder()
        .productProjections()
        .get()
        .execute()
        .catch((error: Error) => error)
    },
  },
}
