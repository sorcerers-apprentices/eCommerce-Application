import type { ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'

import type { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk'

const MainPage = (): ReactElement => {
  // const {
  //   data: authData,
  //   error: authError,
  //   isLoading: authIsLoading,
  // } = useFetch<ClientResponse<CustomerSignInResult>>(() => api.user.authenticate('example', 'example'))
  const { data, error, isLoading } = useFetch<ClientResponse<ProductProjectionPagedSearchResponse>>(
    api.product.fetchProducts
  )

  return (
    <div className="section">
      <h1>eCommerce Application Login</h1>
      <div>
        {/*<h1>eCommerce Application Login</h1>*/}
        {/*{authIsLoading && <Loader />}*/}
        {/*{authError && <div>{authError.message}</div>}*/}
        {/*{authData && <div>Status code: {authData.statusCode}</div>}*/}

        <h1>eCommerce Application Products</h1>
        {isLoading && <Loader />}
        {error && <div>{error.message}</div>}
        {data && <div>Status code: {data.statusCode}</div>}
      </div>
    </div>
  )
}

export default MainPage
