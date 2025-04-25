/// <reference types="vite/client" />

type ImportMetaEnvironment = {
  readonly VITE_PROJECT_KEY: unknown
  readonly VITE_CLIENT_ID: unknown
  readonly VITE_CLIENT_SECRET: unknown
  readonly VITE_SCOPES: unknown
  readonly VITE_API_URL: unknown
  readonly VITE_AUTH_URL: unknown
  readonly VITE_NUM: unknown
}

type ImportMeta = {
  readonly env: ImportMetaEnvironment
}
