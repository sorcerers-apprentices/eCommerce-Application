import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2'
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { environment } from '@/environment.ts'

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: environment.API_URL,
  fetch,
}

// Export the ClientBuilder
const createClient = (): Client => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: environment.AUTH_URL,
    projectKey: environment.PROJECT_KEY,
    credentials: {
      clientId: environment.CLIENT_ID,
      clientSecret: environment.CLIENT_SECRET,
    },
    scopes: environment.SCOPES,
    fetch,
  }

  return (
    new ClientBuilder()
      .withProjectKey(environment.PROJECT_KEY)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withClientCredentialsFlow(authMiddlewareOptions)
      // .withLoggerMiddleware()
      .build()
  )
}

export const createRequestBuilder = (): ByProjectKeyRequestBuilder => {
  const client = createClient()
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: environment.PROJECT_KEY })
}
