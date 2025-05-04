export const readString = (value: FormDataEntryValue | null): string | null => {
  if (typeof value === 'string' || value === null) {
    return value
  } else {
    throw Error('Unexpected type: ' + typeof value)
  }
}

export const required = <T>(value: T | null): T => {
  if (value === null) {
    throw new Error('Unexpected null value')
  }
  return value
}
