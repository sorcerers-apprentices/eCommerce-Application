import type {
  CategoryPagedQueryResponse,
  ClientResponse,
  Customer,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk'
import { builder } from '@/server/client.ts'
import type { SortType } from '@/components/Category/SortComponent/SortControlComponent.tsx'

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
    fetchFacets: async (): Promise<ClientResponse<ProductProjectionPagedSearchResponse> | Error> => {
      return builder()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 0, // only return aggregated (facets) data without any actual product data
            facet: ['variants.attributes.brand'],
          },
        })
        .execute()
    },
    fetchProducts: async (
      filter: CategoryFilter
    ): Promise<ClientResponse<ProductProjectionPagedSearchResponse> | Error> => {
      const sort = Object.entries(filter.sort).flatMap(([name, { locale, direction }]) => {
        if (direction && name === 'price') {
          return [`variants.scopedPrice.currentValue.centAmount ${direction}`]
        }
        return direction ? [`${name}${locale ? `.${locale}` : ''} ${direction}`] : []
      })

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
            'filter.query': [
              filter.sale ? 'variants.prices.discounted:exists' : [],
              filter.brand ? [`variants.attributes.brand:"${filter.brand}"`] : [],
              filter.priceRange
                ? [
                    `variants.scopedPrice.currentValue.centAmount:range(${filter.priceRange.from} to ${filter.priceRange.to})`,
                  ]
                : [],
            ].flat(),
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
            sort,
            priceCurrency: 'EUR',
            priceCountry: 'ES',
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
    fetchProduct: async (id: string): Promise<ClientResponse<ProductProjection>> => {
      return builder().productProjections().withId({ ID: id }).get().execute()
    },
  },
}

export type CentPriceRange = { from: number; to: number }
export type CategoryFilter = {
  categoryIds: Array<string>
  sale?: true
  offset: number
  limit: number
  text?: string
  sort: SortType
  brand: string
  priceRange: CentPriceRange
}
