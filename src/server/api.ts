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
      filter: CategoryFilter
    ): Promise<ClientResponse<ProductProjectionPagedSearchResponse> | Error> => {
      return builder()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: filter.limit,
            offset: filter.offset,
            filter: [
              filter.categoryIds.length
                ? `categories.id:${filter.categoryIds.map((categoryId) => `subtree("${categoryId}")`).join(',')}`
                : [],
            ].flat(),
            'filter.query': [filter.sale ? 'variants.prices.discounted:exists' : []].flat(),
          },
        })
        .execute()
        .catch((error: Error) => error)
    },
    fetchCategories: async (): Promise<ClientResponse<CategoryPagedQueryResponse> | Error> => {
      return builder()
        .categories()
        .get({
          queryArgs: {
            limit: 150,
          },
        })
        .execute()
        .catch((error: Error) => error)
    },
  },
}

export type CategoryFilter = {
  categoryIds: Array<string>
  sale?: true
  offset: number
  limit: number
}
