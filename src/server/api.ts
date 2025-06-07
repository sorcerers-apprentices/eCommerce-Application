import {
  type Cart,
  type CategoryPagedQueryResponse,
  type ClientResponse,
  type Customer,
  type ProductProjection,
  type ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk'
import { builder } from '@/server/client.ts'
import type { SortType } from '@/components/Category/SortComponent/SortControlComponent.tsx'
import type {
  MyCartAddLineItemAction,
  MyCartUpdateAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me'

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
    fetchMe: async (): Promise<ClientResponse<Customer>> => builder().me().get().execute(),
    updateMe: async (actions: Array<MyCustomerUpdateAction>): Promise<ClientResponse<Customer>> =>
      builder()
        .me()
        .post({
          body: {
            version: (await api.user.fetchMe()).body.version,
            actions,
          },
        })
        .execute(),
    updatePassword: async (currentPassword: string, newPassword: string): Promise<ClientResponse<Customer>> => {
      return await builder()
        .me()
        .password()
        .post({
          body: {
            currentPassword,
            newPassword,
            version: (await api.user.fetchMe()).body.version,
          },
        })
        .execute()
    },
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
  cart: {
    fetchActiveCart: async (): Promise<ClientResponse<Cart>> => {
      return builder().me().activeCart().get().execute()
    },
    createCart: async (): Promise<ClientResponse<Cart>> => {
      return builder()
        .me()
        .carts()
        .post({ body: { currency: 'EUR' } })
        .execute()
    },
    addProductToCart: async (cartId: string, productId: string, quantity: number): Promise<ClientResponse<Cart>> => {
      const updateAction: MyCartAddLineItemAction = {
        action: 'addLineItem',
        productId,
        quantity,
      }
      return builder()
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version: (await api.cart.fetchActiveCart()).body.version, actions: [updateAction] } })
        .execute()
    },
    decrementProductInCart: async (cartId: string, productId: string): Promise<ClientResponse<Cart>> => {
      const activeCart = await api.cart.fetchActiveCart()
      const version = activeCart.body.version
      const item = activeCart.body.lineItems.find((i) => i.productId === productId)
      if (!item) {
        throw new Error('Product not found in cart')
      }
      const newQuantity = item.quantity - 1
      const action: MyCartUpdateAction =
        newQuantity > 0
          ? {
              action: 'changeLineItemQuantity',
              lineItemId: item.id,
              quantity: newQuantity,
            }
          : {
              action: 'removeLineItem',
              lineItemId: item.id,
            }
      return builder()
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version,
            actions: [action],
          },
        })
        .execute()
    },
    removeProductFromCart: async (cartId: string, productId: string): Promise<ClientResponse<Cart>> => {
      const activeCart = await api.cart.fetchActiveCart()
      const version = activeCart.body.version
      const actions: MyCartUpdateAction[] = activeCart.body.lineItems
        .filter((item) => item.productId === productId)
        .map((item) => ({
          action: 'removeLineItem',
          lineItemId: item.id,
        }))
      if (actions.length === 0) {
        throw new Error('Product not found in cart')
      }
      return builder()
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version,
            actions,
          },
        })
        .execute()
    },
    clearCart: async (cartId: string): Promise<ClientResponse<Cart>> => {
      const activeCart = await api.cart.fetchActiveCart()
      const version = activeCart.body.version
      const lineItems = activeCart.body.lineItems

      const actions: MyCartUpdateAction[] = lineItems.map((item) => ({
        action: 'removeLineItem',
        lineItemId: item.id,
      }))

      return builder()
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version,
            actions,
          },
        })
        .execute()
    },
    receiveCartWithProducts: async (cartId: string): Promise<ClientResponse<Cart>> => {
      return builder().me().carts().withId({ ID: cartId }).get().execute()
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
