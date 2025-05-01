import {
  ClientBuilder,
  type Client,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2'
import { environment } from '@/app/types/environment'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: environment.API_URL,
  fetch,
}

// Export the ClientBuilder
const createClient = (username: string, password: string): Client => {
  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: environment.AUTH_URL,
    projectKey: environment.PROJECT_KEY,
    credentials: {
      clientId: environment.CLIENT_ID,
      clientSecret: environment.CLIENT_SECRET,
      user: { username, password },
    },
    // tokenCache: {
    //   get(): TokenStore {
    //     const tokenStoreJson = localStorage.getItem('TOKEN_CACHE_KEY')!
    //     return JSON.parse(tokenStoreJson)
    //   },
    //   set(cache: TokenStore): void {
    //     localStorage.setItem('TOKEN_CACHE_KEY', JSON.stringify(cache))
    //   },
    // },
    scopes: environment.SCOPES,
    fetch,
  }

  return new ClientBuilder()
    .withProjectKey(environment.PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(authMiddlewareOptions)
    .build()
}

export const createRequestBuilder = (username: string, password: string): ByProjectKeyRequestBuilder => {
  const client = createClient(username, password)
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: environment.PROJECT_KEY })
}
