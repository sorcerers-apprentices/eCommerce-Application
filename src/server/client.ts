import {
  type AuthMiddlewareOptions,
  type Client,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
  type TokenStore,
} from '@commercetools/sdk-client-v2'
import { environment } from '@/app/types/environment'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import type {
  AnonymousAuthMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'

const tokenCacheKey = 'COMMERCE_TOOLS_TOKEN_CACHE_KEY'
const tokenCache: TokenCache = {
  get(): TokenStore {
    const tokenStoreJson = localStorage.getItem(tokenCacheKey)!
    return JSON.parse(tokenStoreJson)
  },
  set(cache: TokenStore): void {
    localStorage.setItem(tokenCacheKey, JSON.stringify(cache))
  },
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: environment.API_URL,
  fetch,
}

const createAnonymousClient = (): Client => {
  const authMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: environment.AUTH_URL,
    projectKey: environment.PROJECT_KEY,
    credentials: {
      clientId: environment.CLIENT_ID,
      clientSecret: environment.CLIENT_SECRET,
      anonymousId: crypto.randomUUID(),
    },
    tokenCache: tokenCache,
    scopes: environment.SCOPES,
    fetch,
  }

  return new ClientBuilder()
    .withProjectKey(environment.PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(authMiddlewareOptions)
    .build()
}

const createAnonymousRequestBuilder = (): ByProjectKeyRequestBuilder => {
  const client = createAnonymousClient()
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: environment.PROJECT_KEY })
}

let anonymousBuilder: ByProjectKeyRequestBuilder = createAnonymousRequestBuilder()
let refreshBuilder: ByProjectKeyRequestBuilder | undefined

export const isAnonymous = (): boolean => {
  const refreshToken = tokenCache.get()?.refreshToken
  if (!refreshToken) {
    return true
  }
  const expirationDate = tokenCache.get()?.expirationTime || 0
  return Date.now() > expirationDate
}

export const builder = (): ByProjectKeyRequestBuilder => {
  if (refreshBuilder) {
    return refreshBuilder
  }
  if (!isAnonymous()) {
    refreshBuilder = createRefreshBuilder()
    return refreshBuilder
  }
  return anonymousBuilder
}

export const resetClients = (): void => {
  localStorage.removeItem(tokenCacheKey)
  refreshBuilder = undefined
  anonymousBuilder = createAnonymousRequestBuilder()
}

export const getRefreshToken = (): string | undefined => {
  return tokenCache.get()?.refreshToken
}

export const createRegistrationRequestBuilder = (): ByProjectKeyRequestBuilder => {
  const client = createRegistrationClient()
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: environment.PROJECT_KEY })
}

export const createPasswordRequestBuilder = (username: string, password: string): ByProjectKeyRequestBuilder => {
  const client = createPasswordClient(username, password)
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: environment.PROJECT_KEY })
}

export const createRefreshBuilder = (): ByProjectKeyRequestBuilder => {
  const client = createRefreshClient()
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: environment.PROJECT_KEY })
}

const createRegistrationClient = (): Client => {
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

const createPasswordClient = (username: string, password: string): Client => {
  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: environment.AUTH_URL,
    projectKey: environment.PROJECT_KEY,
    credentials: {
      clientId: environment.CLIENT_ID,
      clientSecret: environment.CLIENT_SECRET,
      user: { username, password },
    },
    tokenCache: tokenCache,
    scopes: environment.SCOPES,
  }

  return new ClientBuilder()
    .withProjectKey(environment.PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(authMiddlewareOptions)
    .build()
}

const createRefreshClient = (): Client => {
  const options: RefreshAuthMiddlewareOptions = {
    host: environment.AUTH_URL,
    projectKey: environment.PROJECT_KEY,
    credentials: {
      clientId: environment.CLIENT_ID,
      clientSecret: environment.CLIENT_SECRET,
    },
    refreshToken: tokenCache.get().refreshToken!,
    tokenCache: tokenCache,
    fetch,
  }
  return new ClientBuilder()
    .withProjectKey(environment.PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withRefreshTokenFlow(options)
    .build()
}
