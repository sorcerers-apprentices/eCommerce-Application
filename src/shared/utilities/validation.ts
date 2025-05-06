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
  } else if (!firstName.match(/[^a-zA-Z0-9]/)) {
    return 'First name cannot include special characters'
  } else if (!firstName.match(/[^a-zA-Z]/)) {
    return 'First name cannot include numbers'
  } else {
    return null
  }
}

export const validateLastName = (lastName: string): string | null => {
  if (!lastName.length) {
    return 'Last name cannot be empty'
  } else if (!lastName.match(/[^a-zA-Z0-9]/)) {
    return 'Last name cannot include special characters'
  } else if (!lastName.match(/[^a-zA-Z]/)) {
    return 'Last name cannot include numbers'
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
  } else if (!city.match(/[^a-zA-Z0-9]/)) {
    return 'City cannot include special characters'
  } else if (!city.match(/[^a-zA-Z]/)) {
    return 'City cannot include numbers'
  } else {
    return null
  }
}

export const validaCountry = (country: string): string | null => {
  if (!country.length) {
    return 'Country must not be empty'
  } else {
    return null
  }
}

export const validateBirthDate = (birthDate: string): string | null => {
  const date = new Date(birthDate)
  const minDate = new Date('2012-01-01')
  if (!birthDate.length) {
    return 'Date of birthday cannot be empty'
  } else if (date < minDate) {
    return 'You should have 13 or more years'
  } else {
    return null
  }
}

export const validatePostCode = (postCode: string): string | null => {
  if (!postCode.length) {
    return 'Post code cannot be empty'
  } else {
    return null
  }
}
