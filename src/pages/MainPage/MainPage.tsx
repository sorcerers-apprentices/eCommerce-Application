import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { useFetch } from '@/shared/hooks/useFetch'
import { authenticate, fetchProducts } from '@/server/api'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import type { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk'
import type { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer'

const MainPage = (): ReactElement => {
  const {
    data: authData,
    error: authError,
    isLoading: authIsLoading,
  } = useFetch<ClientResponse<CustomerSignInResult>>(() => authenticate('example', 'example'))
  const { data, error, isLoading } = useFetch<ClientResponse<ProductPagedQueryResponse>>(fetchProducts)

  return (
    <>
      <h1>eCommerce Application Login</h1>
      {authIsLoading && <Loader />}
      {authError && <div>{authError.message}</div>}
      {authData && <div>Status code: {authData.statusCode}</div>}

      <h1>eCommerce Application Products</h1>
      {isLoading && <Loader />}
      {error && <div>{error.message}</div>}
      {data && <div>Status code: {data.statusCode}</div>}

      <Link to={RoutePath.LOGIN}>Go Login Page</Link>
    </>
  )
}

export default MainPage
