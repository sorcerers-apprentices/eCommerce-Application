type Environment = {
  readonly PROJECT_KEY: string
  readonly CLIENT_ID: string
  readonly CLIENT_SECRET: string
  readonly SCOPES: Array<string>
  readonly API_URL: string
  readonly AUTH_URL: string
}

const requiredString = (key: string): string => {
  const value = import.meta.env[key]
  if (typeof value === 'string') {
    return value
  }
  throw new Error(`${key} is not a valid environment key`)
}

export const environment: Environment = {
  PROJECT_KEY: requiredString('VITE_PROJECT_KEY'),
  CLIENT_ID: requiredString('VITE_CLIENT_ID'),
  CLIENT_SECRET: requiredString('VITE_CLIENT_SECRET'),
  SCOPES: requiredString('VITE_SCOPES').split(','),
  API_URL: requiredString('VITE_API_URL'),
  AUTH_URL: requiredString('VITE_AUTH_URL'),
}
