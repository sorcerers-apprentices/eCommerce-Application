import { createRequestBuilder } from '@/server/client'
import type { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk'
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

let builder: ByProjectKeyRequestBuilder | undefined

export enum ApiErrorCode {
  INVALID_CUSTOMER_ACCOUNT_CREDENTIALS = 'invalid_customer_account_credentials',
}

export const authenticate = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
  builder = createRequestBuilder(email, password)
  return builder
    .login()
    .post({
      body: { email, password },
    })
    .execute()
}

export const register = (
  email: string,
  firstName: string,
  lastName: string,
  street: string,
  city: string,
  postalCode: string,
  country: string,
  password: string
): Promise<ClientResponse<CustomerSignInResult>> => {
  builder = createRequestBuilder(email, password)
  return builder
    .customers()
    .post({
      body: { email, firstName, lastName, addresses: [{ streetName: street, city, postalCode, country }], password },
    })
    .execute()
}

export const fetchProducts = async (): Promise<ClientResponse<ProductPagedQueryResponse> | Error> => {
  return builder!
    .products()
    .get()
    .execute()
    .catch((error: Error) => error)
}
