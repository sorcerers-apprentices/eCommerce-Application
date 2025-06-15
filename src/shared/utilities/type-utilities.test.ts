import { describe, expect } from 'vitest'
import { calculatePrices, type Code, findPromoCodes } from '@/shared/utilities/type-utilities.ts'
import type { Cart, LineItem } from '@commercetools/platform-sdk'

const makeLineItem = (id: string, priceCents: number, qty = 1, discountCentsPerUnit: number | undefined): LineItem => {
  return {
    id,
    quantity: qty,
    price: {
      value: { currencyCode: 'EUR', centAmount: priceCents },
      discounted: {
        value: {
          currencyCode: 'EUR',
          centAmount: 100,
        },
        discount: {
          typeId: 'product-discount',
          id: 'd1',
        },
      },
    },
    discountedPricePerQuantity: discountCentsPerUnit
      ? [
          {
            quantity: qty,
            discountedPrice: {
              includedDiscounts: [
                {
                  discount: { typeId: 'cart-discount', id: 'd2' },
                  discountedAmount: { centAmount: discountCentsPerUnit, currencyCode: 'EUR' },
                },
              ],
            },
          },
        ]
      : undefined,
  } as unknown as LineItem
}

describe('calculatePrices validation', () => {
  test('should return zeroes for undefined data', () => {
    const result = calculatePrices(undefined)
    expect(result).toEqual({ initialPrice: 0, discountPrice: 0, totalPrice: 0 })
  })
  test('applies only cart-level discount', () => {
    const cart: Cart = {
      lineItems: [makeLineItem('a', 3800, 1, 380)],
      totalPrice: { currencyCode: 'EUR', centAmount: 3420 },
      discountCodes: [],
    } as unknown as Cart
    const result = calculatePrices(cart)
    expect(result.initialPrice).toBe(38)
    expect(result.discountPrice).toBeCloseTo(3.8)
    expect(result.totalPrice).toBeCloseTo(34.2)
  })
  test('applies cart-level discount', () => {
    const cart: Cart = {
      lineItems: [makeLineItem('a', 2000, 1, undefined)],
      totalPrice: { centAmount: 2000, currencyCode: 'EUR' },
      discountOnTotalPrice: {
        discountedAmount: { centAmount: 500, currencyCode: 'EUR' },
      },
      discountCodes: [],
    } as unknown as Cart
    const result = calculatePrices(cart)
    expect(result.initialPrice).toBe(25)
    expect(result.discountPrice).toBeCloseTo(5)
    expect(result.totalPrice).toBeCloseTo(20)
  })
  test('applies both item and cart-level discounts', () => {
    const cart: Cart = {
      lineItems: [makeLineItem('c1', 1000, 1, 100), makeLineItem('c2', 500, 3, 50)],
      totalPrice: { centAmount: 1000 - 100 + 3 * (500 - 50) - 300, currencyCode: 'EUR' },
      discountOnTotalPrice: {
        discountedAmount: { centAmount: 300, currencyCode: 'EUR' },
      },
      discountCodes: [],
    } as unknown as Cart

    const result = calculatePrices(cart)
    expect(result.initialPrice).toBeCloseTo((1000 + 500 * 3) / 100)
    expect(result.discountPrice).toBeCloseTo((100 + 50 * 3 + 300) / 100)
    expect(result.totalPrice).toBeCloseTo(result.initialPrice - result.discountPrice)
  })
})

describe('findPromoCodes validation', () => {
  test('should return empty array if no cart is provided', () => {
    expect(findPromoCodes(undefined)).toEqual([])
  })
  test('should return correct promo codes from cart', () => {
    const cart: Cart = {
      discountCodes: [
        {
          discountCode: {
            id: 'promo-id-1',
            obj: {
              name: { 'en-US': 'Summer Sale' },
            },
          },
        },
        {
          discountCode: {
            id: 'promo-id-2',
            obj: {
              name: { 'en-US': 'Winter Deal' },
            },
          },
        },
      ],
    } as unknown as Cart
    const expected: Code[] = [
      { id: 'promo-id-1', name: 'Summer Sale' },
      { id: 'promo-id-2', name: 'Winter Deal' },
    ]

    expect(findPromoCodes(cart)).toEqual(expected)
  })
  test('should handle missing name in obj gracefully', () => {
    const cart = {
      discountCodes: [
        {
          discountCode: {
            id: 'promo-id-3',
            obj: {}, // name missing
          },
        },
      ],
    } as unknown as Cart

    const expected: Code[] = [{ id: 'promo-id-3', name: undefined }]

    expect(findPromoCodes(cart)).toEqual(expected)
  })
})
