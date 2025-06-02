import type { ValidationData } from '@/hooks/useValidate.tsx'

export const POSTAL_CODE_REGEX = {
  GB: /^(GIR\s?0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/,
  PL: /^\d{2}-\d{3}$/,
  ES: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
}

export const validateEmail = (email: string): string | null => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (/\s/.test(email)) {
    return 'Email should not include whitespaces'
  } else if (!email.includes('@')) {
    return 'Email should include @'
  } else if (!regex.test(email)) {
    return "Invalid email format, proper format is 'user@example.com'"
  } else {
    return null
  }
}

export const validatePassword = (password: string): string | null => {
  const minLength = 8
  if (/\s/.test(password)) {
    return 'Password should not include whitespaces'
  } else if (password.length < minLength) {
    return 'Password should be at least 8 characters'
  } else if (!/[A-Z]/.test(password)) {
    return 'Password should include uppercase letters'
  } else if (!/[a-z]/.test(password)) {
    return 'Password should include lowercase letters'
  } else if (!/[0-9]/.test(password)) {
    return 'Password should include numbers'
  } else {
    return null
  }
}

export const validateFirstName = (firstName: string): string | null => {
  if (!firstName.length) {
    return 'First name cannot be empty'
  } else if (/[^A-Za-z 0-9]/g.test(firstName)) {
    return 'First name cannot include special characters'
  } else if (/[0-9]/.test(firstName)) {
    return 'First name cannot include numbers'
  } else {
    return null
  }
}

export const validateLastName = (lastName: string): string | null => {
  if (!lastName.length) {
    return 'Last name cannot be empty'
  } else if (/[^A-Za-z 0-9]/g.test(lastName)) {
    return 'Last name cannot include special characters'
  } else if (/[0-9]/.test(lastName)) {
    return 'Last name cannot include numbers'
  } else {
    return null
  }
}

export const validateBirthDate = (birthDate: string): string | null => {
  const checkDate = new Date(birthDate)
  const dateNow = new Date()
  const checkAge = 13
  const pastDate = new Date(dateNow.setFullYear(dateNow.getFullYear() - checkAge))
  if (!birthDate.length) {
    return 'Date of birthday cannot be empty'
  } else if (checkDate > pastDate) {
    return 'You should have 13 or more years'
  } else {
    return null
  }
}

export const validateStreet = (street: string): string | null => {
  if (!street.length) {
    return 'Street cannot be empty'
  } else {
    return null
  }
}

export const validateCity = (city: string): string | null => {
  if (!city.length) {
    return 'City cannot be empty'
  } else if (/[^A-Za-z 0-9]/g.test(city)) {
    return 'City cannot include special characters'
  } else if (/[0-9]/.test(city)) {
    return 'City cannot include numbers'
  } else {
    return null
  }
}

export const validateCountry = (country: string): string | null => {
  if (!country.length) {
    return 'Country must not be empty'
  } else if (country !== 'United Kingdom' && country !== 'Poland' && country !== 'Spain') {
    return 'Country must from a predefined list'
  } else {
    return null
  }
}

export const createSelectValidator = (allowed: Array<string>): ((value: string) => string | null) => {
  return (value: string): string | null => {
    if (!allowed.includes(value)) {
      return 'Country must from a predefined list'
    } else {
      return null
    }
  }
}

export const createRegexValidator = (allowed: Array<RegExp>): ((value: string) => string | null) => {
  return (value: string): string | null => {
    for (const regex of allowed) {
      if (regex.test(value)) {
        return null
      }
    }
    return 'Invalid value'
  }
}

export const createPostalCodeValidator = (countryFormControlName: string) => {
  return (postalCode: string, state: ValidationData): string | null =>
    validatePostalCode(postalCode, state, countryFormControlName)
}

const validatePostalCode = (
  postalCode: string,
  state: ValidationData,
  countryFormControlName: string
): string | null => {
  if (!state[countryFormControlName].touched || !state[countryFormControlName].value) {
    return 'Choose your country'
  } else if (!postalCode.length) {
    return 'Post code cannot be empty'
  } else if (state[countryFormControlName].value === 'United Kingdom') {
    const regex = /^(GIR\s?0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/
    if (!regex.test(postalCode)) {
      return 'Post code of United Kingdom must be format "W1U 8ED"'
    } else {
      return null
    }
  } else if (state[countryFormControlName].value === 'Poland') {
    const regex = /^\d{2}-\d{3}$/
    if (!regex.test(postalCode)) {
      return 'Post code of Poland must be format "00-001"'
    } else {
      return null
    }
  } else if (state[countryFormControlName].value === 'Spain') {
    const regex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/
    if (!regex.test(postalCode)) {
      return 'Post code of Spain must be format "08830"'
    } else {
      return null
    }
  } else {
    return null
  }
}
