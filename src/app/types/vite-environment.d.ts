/// <reference types="vite/client" />

type ImportMetaEnvironment = {
  readonly API_URL: string
  readonly API_KEY: string
}

type ImportMeta = {
  readonly env: ImportMetaEnvironment
}
