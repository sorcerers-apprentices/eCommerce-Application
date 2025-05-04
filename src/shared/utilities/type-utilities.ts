import type { CommerceToolsError } from '@/shared/types/error-types.ts'

export const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null
}

export const isCommerceToolsError = (error: unknown): error is CommerceToolsError => {
  if (isObject(error) && 'body' in error) {
    return isObject(error.body) && 'errors' in error.body
  } else {
    return false
  }
}
