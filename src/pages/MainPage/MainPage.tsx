import type { ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'

import type { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk'

const MainPage = (): ReactElement => {
  const { data, error, isLoading } = useFetch<ClientResponse<ProductProjectionPagedSearchResponse>>(
    api.product.fetchProducts
  )

  return (
    <>
      <h1>eCommerce Application Products</h1>
      {isLoading && <Loader />}
      {error && <div>{error.message}</div>}
      {data && <div>Status code: {data.statusCode}</div>}

      <Link to={RoutePath.LOGIN}>Go Login Page</Link>
    </>
  )
}

export default MainPage
