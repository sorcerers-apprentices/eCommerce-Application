import { describe, expect } from 'vitest'
import {
  validateCountry,
  validateBirthDate,
  validateCity,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateStreet,
  createPostalCodeValidator,
} from './validation.ts'

describe('email validation', () => {
  test('should return error: Email should not include whitespaces', () => {
    const variants = ['test @example.com', 'test@ example.com', 'test@example .com', 'user@example.com ']
    for (const variant of variants) {
      expect(validateEmail(variant)).toEqual('Email should not include whitespaces')
    }
  })
  test('should return error: Email should include @', () => {
    const variants = ['testexample.com', 'userexample.ru']
    for (const variant of variants) {
      expect(validateEmail(variant)).toEqual('Email should include @')
    }
  })
  test("should return error: Invalid email format, proper format is 'user@example.com'", () => {
    const variants = ['test@example', 'user@.com.', 'user@', 'user@com.1', 'user@example.c']
    for (const variant of variants) {
      expect(validateEmail(variant)).toEqual("Invalid email format, proper format is 'user@example.com'")
    }
  })
  test('should pass validation', () => {
    const variants = ['test@example.com', 'user.name+tag@example.co.uk', 'user_name@example.org', 'user123@example.net']
    for (const variant of variants) {
      expect(validateEmail(variant)).toEqual(null)
    }
  })
})

describe('password validation', () => {
  test('should return error: Password should be at least 8 characters', () => {
    expect(validatePassword('a')).toEqual('Password should be at least 8 characters')
    expect(validatePassword('short1')).toEqual('Password should be at least 8 characters')
  })
  test('should return error: Password should include numbers', () => {
    expect(validatePassword('NoDigits')).toEqual('Password should include numbers')
  })
  test('should return error: Password should include lowercase letters', () => {
    expect(validatePassword('NOLOWERCASE1')).toEqual('Password should include lowercase letters')
  })
  test('should return error: Password should include uppercase letters', () => {
    expect(validatePassword('nouppercase1')).toEqual('Password should include uppercase letters')
  })
  test('should return error: Password should not include whitespaces', () => {
    const variants = ['Spaces NotAllowed1', ' ', 'Password  ', ' Password1']
    for (const variant of variants) {
      expect(validatePassword(variant)).toEqual('Password should not include whitespaces')
    }
  })
  test('should pass validation', () => {
    const variants = ['aEr23trfg', 'Password1', 'ValidPass123', 'StrongPass!4', 'NoSpaces1']
    for (const variant of variants) {
      expect(validatePassword(variant)).toEqual(null)
    }
  })
})

describe('first name validation', () => {
  test('should return error: First name cannot be empty', () => {
    expect(validateFirstName('')).toEqual('First name cannot be empty')
  })
  test('should return error: First name cannot include special characters', () => {
    const variants = ['name#', 'name%', 'name-', 'name_', 'name$']
    for (const variant of variants) {
      expect(validateFirstName(variant)).toEqual('First name cannot include special characters')
    }
  })
  test('should return error: First name cannot include numbers', () => {
    expect(validateFirstName('v0t')).toEqual('First name cannot include numbers')
    expect(validateFirstName('76name')).toEqual('First name cannot include numbers')
  })
  test('should pass validation', () => {
    const variants = ['J', 'Jonn', 'Jonn Snow', 'r']
    for (const variant of variants) {
      expect(validateFirstName(variant)).toEqual(null)
    }
  })
})

describe('last name validation', () => {
  test('should return error: Last name cannot be empty', () => {
    expect(validateLastName('')).toEqual('Last name cannot be empty')
  })
  test('should return error: Last name cannot include special characters', () => {
    const variants = ['name#', 'name%', 'name-', 'name_', 'name$']
    for (const variant of variants) {
      expect(validateLastName(variant)).toEqual('Last name cannot include special characters')
    }
  })
  test('should return error: Last name cannot include numbers', () => {
    expect(validateLastName('v0t')).toEqual('Last name cannot include numbers')
    expect(validateLastName('76name')).toEqual('Last name cannot include numbers')
  })
  test('should pass validation', () => {
    const variants = ['J', 'Jonn', 'Jonn Snow', 'r']
    for (const variant of variants) {
      expect(validateLastName(variant)).toEqual(null)
    }
  })
})

describe('street validation', () => {
  test('should return error: Street cannot be empty', () => {
    expect(validateStreet('')).toEqual('Street cannot be empty')
  })
  test('should pass validation', () => {
    const variants = ['J', 'Baker', 'Baker Street', 'r']
    for (const variant of variants) {
      expect(validateStreet(variant)).toEqual(null)
    }
  })
})

describe('city validation', () => {
  test('should return error: City cannot be empty', () => {
    expect(validateCity('')).toEqual('City cannot be empty')
  })
  test('should return error: City cannot include special characters', () => {
    const variants = ['name#', 'name%', 'name-', 'name_', 'name$']
    for (const variant of variants) {
      expect(validateCity(variant)).toEqual('City cannot include special characters')
    }
  })
  test('should return error: City cannot include numbers', () => {
    const variants = ['67name8', '4', 'v0tyff']
    for (const variant of variants) {
      expect(validateCity(variant)).toEqual('City cannot include numbers')
    }
  })
  test('should pass validation', () => {
    const variants = ['J', 'Baden Baden', 'London', 'r', 'Warshaw', 'Madrid']
    for (const variant of variants) {
      expect(validateCity(variant)).toEqual(null)
    }
  })
})

describe('country validation', () => {
  test('should return error: Country must not be empty', () => {
    expect(validateCountry('')).toEqual('Country must not be empty')
  })
  test('should return error: Country must from a predefined list', () => {
    expect(validateCountry('Germany')).toEqual('Country must from a predefined list')
    expect(validateCountry('Belarus')).toEqual('Country must from a predefined list')
  })
  test('should pass validation', () => {
    const variants = ['United Kingdom', 'Poland', 'Spain']
    for (const variant of variants) {
      expect(validateCountry(variant)).toEqual(null)
    }
  })
})

describe('postCode validation', () => {
  const validator = createPostalCodeValidator('country')
  test('should return error: Choose your country', () => {
    expect(validator('56432', { country: { value: '', touched: false } })).toEqual('Choose your country')
    expect(validator('56432', { country: { value: '', touched: true } })).toEqual('Choose your country')
  })
  test('should return error: Post code cannot be empty', () => {
    expect(validator('', { country: { value: 'United Kingdom', touched: true } })).toEqual('Post code cannot be empty')
  })
  test('should return error: Post code of Country must be format', () => {
    expect(validator('00-001', { country: { value: 'United Kingdom', touched: true } })).toEqual(
      'Post code of United Kingdom must be format "W1U 8ED"'
    )
    expect(validator('W1U 8ED', { country: { value: 'Poland', touched: true } })).toEqual(
      'Post code of Poland must be format "00-001"'
    )
    expect(validator('W1U 8ED', { country: { value: 'Spain', touched: true } })).toEqual(
      'Post code of Spain must be format "08830"'
    )
  })
  test('should pass validation', () => {
    expect(validator('W1U 6AE', { country: { value: 'United Kingdom', touched: true } })).toEqual(null)
    expect(validator('01-962', { country: { value: 'Poland', touched: true } })).toEqual(null)
    expect(validator('29700', { country: { value: 'Spain', touched: true } })).toEqual(null)
  })
})

describe('birthDate validation', () => {
  const dateNow = new Date()
  const checkAge = 13
  const pastDate = new Date(dateNow.getFullYear() - checkAge, dateNow.getMonth(), dateNow.getDate())
  test('should return error: Date of birthday cannot be empty', () => {
    expect(validateBirthDate('')).toEqual('Date of birthday cannot be empty')
  })
  test('should return error: You should have 13 or more years', () => {
    const testDate = new Date(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate() + 1)
    const testDate2 = new Date(pastDate.getFullYear() + 1, pastDate.getMonth(), pastDate.getDate())
    expect(validateBirthDate(convertDate(testDate))).toEqual('You should have 13 or more years')
    expect(validateBirthDate(convertDate(testDate2))).toEqual('You should have 13 or more years')
  })
  test('should pass validation', () => {
    const testDate = new Date(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate() - 1)
    expect(validateBirthDate(convertDate(pastDate))).toEqual(null)
    expect(validateBirthDate(convertDate(testDate))).toEqual(null)
  })
})

const convertDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}
