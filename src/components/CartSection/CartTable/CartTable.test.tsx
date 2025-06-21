import { describe, it, expect, vi } from 'vitest'
import { CartTable } from './CartTable'
import { render, screen } from '@testing-library/react'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { MemoryRouter } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const mockData = {
  body: {
    lineItems: [],
    totalPrice: {
      centAmount: 0,
      currencyCode: 'EUR',
    },
    discountCodes: [],
  },
} as unknown as ClientResponse<Cart>

vi.mock('@/shared/hooks/useFetch', () => ({
  useFetch: (): {
    data: Partial<ClientResponse<Cart>>
    error: Error | null
    loading: boolean
    refetch: () => void
  } => ({
    data: mockData,
    loading: false,
    error: null,
    refetch: vi.fn(),
  }),
}))
vi.mock('@/server/client', () => ({
  client: {},
}))
describe('CartTable component', () => {
  it('renders empty cart message and "Go to catalog" button', () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.CART]}>
        <CartTable />
      </MemoryRouter>
    )

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /go to catalog/i })
    expect(button).toBeInTheDocument()
  })
})
