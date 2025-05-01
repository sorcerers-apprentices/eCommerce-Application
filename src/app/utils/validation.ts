//<input type="email">

//<input type="password">
// don't forgot about Show/Hide Password Functionality !!!

// Validation checks are performed as the user types.

//event.preventDefault() in both inputs

export const emailValidation: (value: string) => boolean = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return value === value.trim() && value.includes('@') && regex.test(value)
}

//error text: please, enter your email in proper format 'user@example.com'

export const passwordValidation: (value: string) => boolean = (value: string): boolean => {
  const minLength = 8
  return (
    value === value.trim() &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /[0-9]/.test(value) &&
    value.length >= minLength
  )
}

//I don't check password on special character, course message is too long
//error text: your password must be at least 8 characters long without leading or trailing whitespace, contain uppercase and lowercase letters and at least one digit
