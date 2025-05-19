import type { ClientResponse, Customer, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk'
import { builder } from '@/server/client.ts'

export enum ApiErrorCode {
  INVALID_CUSTOMER_ACCOUNT_CREDENTIALS = 'invalid_customer_account_credentials',
  DUPLICATE_FIELD = 'DuplicateField',
  LOCKED_FIELD = 'LockedField',
  INVALID_FIELD = 'InvalidField',
  REQUIRED_FIELD = 'RequiredField',
  RESOURCE_NOT_FOUND = 'ResourceNotFound',
}

export const api = {
  user: {
    fetchMe: async (): Promise<ClientResponse<Customer> | Error> => builder().me().get().execute(),
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
