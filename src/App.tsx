import './App.scss'
import type { ReactElement } from 'react'
import { authenticate, fetchProducts } from '@/server/api'
import { useFetch } from '@/shared/hooks/useFetch'
import type { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk'
import type { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer'

function App(): ReactElement {
  const {
    data: authData,
    error: authError,
    isLoading: authIsLoading,
  } = useFetch<ClientResponse<CustomerSignInResult>>(() => authenticate('example', 'example'))
  const { data, error, isLoading } = useFetch<ClientResponse<ProductPagedQueryResponse>>(fetchProducts)
  return (
    <div className="container">
      <h1>eCommerce Application Login</h1>
      {authIsLoading && <div>Loading...</div>}
      {authError && <div>{authError.message}</div>}
      {authData && <div>Status code: {authData.statusCode}</div>}

      <h1>eCommerce Application Products</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data && <div>Status code: {data.statusCode}</div>}
    </div>
  )
}

export default App
