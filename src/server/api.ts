import type {
  CategoryPagedQueryResponse,
  ClientResponse,
  Customer,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk'
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
    fetchProducts: async (
      offset: number,
      limit: number
    ): Promise<ClientResponse<ProductProjectionPagedSearchResponse> | Error> => {
      return builder()
        .productProjections()
        .get({
          queryArgs: {
            limit,
            offset,
          },
        })
        .execute()
        .catch((error: Error) => error)
    },
    // errors!!!
    // fetchPrice(): async (): void => builder().productDiscounts().
    fetchProductsInCategory: async (
      categoryId: string,
      offset: number,
      limit: number
    ): Promise<ClientResponse<ProductProjectionPagedSearchResponse> | Error> => {
      return builder()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit,
            offset,
            filter: `categories.id:subtree("${categoryId}")`,
          },
        })
        .execute()
        .catch((error: Error) => error)
    },
    fetchCategories: async (): Promise<ClientResponse<CategoryPagedQueryResponse> | Error> => {
      return builder()
        .categories()
        .get()
        .execute()
        .catch((error: Error) => error)
    },
  },
}
