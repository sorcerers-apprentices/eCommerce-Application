import './App.scss'
import { NavigateButtons } from './components/NavigateButtons'
import type { ReactElement } from 'react'
import { fetchProducts } from '@/server/api'
import { useFetch } from '@/shared/hooks/useFetch'
import type { ClientResponse } from '@commercetools/platform-sdk'
import type { ProductPagedQueryResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product'

function App(): ReactElement {
  const { data, error, isLoading } = useFetch<ClientResponse<ProductPagedQueryResponse>>(fetchProducts)
  return (
    <div className="container">
      <h1>eCommerce Application</h1>
      <NavigateButtons />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data && <div>Status code: {data.statusCode}</div>}
    </div>
  )
}

export default App
