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

const FIRST_CHECK_LENGTH = 2
const SECOND_CHECK_LENGTH = 5
const MAX_FUZZY_LEVEL = 2

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
            ...(filter.text
              ? {
                  'text.en-US': `*${filter.text}*`,
                  fuzzy: true,
                  fuzzyLevel:
                    filter.text.length < FIRST_CHECK_LENGTH
                      ? 0
                      : filter.text.length < SECOND_CHECK_LENGTH
                        ? 1
                        : MAX_FUZZY_LEVEL,
                }
              : {}),
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
  text?: string
}
