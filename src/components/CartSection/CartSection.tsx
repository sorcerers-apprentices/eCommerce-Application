import type { JSX } from 'react'
import s from './CartSection.module.scss'
import { CartTable } from './CartTable/CartTable'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import Loader from '@/shared/ui/Loader/Loader'

export const CartSection = (): JSX.Element => {
  const { data, error, loading } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)
  const REPLACER = null
  const SPACE = 2
  return (
    <div className={s.section}>
      <h2 className="title">Cart</h2>
      <CartTable />
      <div>
        {loading && <Loader />}
        {error && <div>{error.message}</div>}
        {data && <pre style={{ textAlign: 'left' }}>{JSON.stringify(data.body.lineItems, REPLACER, SPACE)}</pre>}
      </div>
    </div>
  )
}
