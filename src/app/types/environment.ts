type Environment = {
  readonly PROJECT_KEY: string
  readonly CLIENT_ID: string
  readonly CLIENT_SECRET: string
  readonly SCOPES: Array<string>
  readonly API_URL: string
  readonly AUTH_URL: string
  readonly NUM: number
}

export const environment: Environment = {
  PROJECT_KEY: import.meta.env.VITE_PROJECT_KEY,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
  SCOPES: import.meta.env.VITE_SCOPES.split(','),
  API_URL: import.meta.env.VITE_API_URL,
  AUTH_URL: import.meta.env.VITE_AUTH_URL,
  NUM: Number(import.meta.env.VITE_NUM),
}
