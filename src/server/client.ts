import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
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

  return new ClientBuilder()
    .withProjectKey(environment.PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build()
}

export const createRequestBuilder = (): ByProjectKeyRequestBuilder => {
  const client = createClient()
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: environment.PROJECT_KEY })
}
