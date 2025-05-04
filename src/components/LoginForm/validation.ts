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
