import { useEffect, useState } from 'react'

export type ValidationErrors = { [key: string]: string | null }
export type ValidationData = { [key: string]: { value: string; touched: boolean } }

export const transformToValidationData = (data: Record<string, string>): ValidationData => {
  const result: ValidationData = {}
  Object.entries(data).forEach(([key, value]) => {
    result[key] = {
      value,
      touched: true,
    }
  })
  return result
}

export const useValidate = (
  state: ValidationData,
  validators: { [key: string]: Array<(value: string, state: ValidationData) => string | null> }
): {
  errors: ValidationErrors
  isValid: boolean
} => {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValid, setIsValid] = useState(false)

  const isFormValid = (): boolean => {
    for (const entry of Object.entries(validators)) {
      const key = entry[0]
      const validators = entry[1]
      for (const validator of validators) {
        if (validator(state[key].value, state)) {
          return false
        }
      }
    }
    return true
  }

  const validate = (key: string): void => {
    const value = state[key].value
    for (const validator of validators[key] || []) {
      const error = validator(value, state)
      if (error) {
        setErrors((previous) => ({ ...previous, [key]: error }))
        setIsValid(false)
        return
      }
    }
    setErrors((previous) => {
      setIsValid(isFormValid())
      return { ...previous, [key]: null }
    })
  }

  useEffect(() => {
    for (const entry of Object.entries(state)) {
      const key = entry[0]
      const value = entry[1]
      if (value.touched) {
        validate(key)
      }
    }
  }, [state])

  return {
    errors,
    isValid,
  }
}
