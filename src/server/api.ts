import type { ClientResponse } from '@commercetools/platform-sdk'
import type { ProductPagedQueryResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product'
import { createRequestBuilder } from '@/server/client.ts'

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

export const isError = (object: Error | ClientResponse): object is Error => {
  return 'name' in object && 'message' in object && 'stack' in object
}

export const isClientResponse = (object: ClientResponse | Error): object is ClientResponse => {
  return 'body' in object
}

export const fetchProducts = async (): Promise<ClientResponse<ProductPagedQueryResponse> | Error> => {
  return createRequestBuilder()
    .products()
    .get()
    .execute()
    .catch((error: Error) => error)
}
