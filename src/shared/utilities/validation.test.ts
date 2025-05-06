import { describe, expect } from 'vitest'
import {
  validaCountry,
  validateBirthDate,
  validateCity,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePostCode,
  validateStreet,
} from './validation.ts'
import { state1, state2, state3, state4, state5 } from './stats-for-validation.ts'

describe('emailValidation', () => {
  test('should return error text', () => {
    expect(validateEmail('test @example.com')).toEqual('Email should not include whitespaces')
    expect(validateEmail('test@ example.com')).toEqual('Email should not include whitespaces')
    expect(validateEmail('test@example .com')).toEqual('Email should not include whitespaces')
    expect(validateEmail('user@example.com ')).toEqual('Email should not include whitespaces')
    expect(validateEmail('user@example.  com')).toEqual('Email should not include whitespaces')
    expect(validateEmail('testexample.com')).toEqual('Email should include @')
    expect(validateEmail('userexample.ru')).toEqual('Email should include @')
    expect(validateEmail('test@example')).toEqual("Invalid email format, proper format is 'user@example.com'")
    expect(validateEmail('user@.com.')).toEqual("Invalid email format, proper format is 'user@example.com'")
    expect(validateEmail('user@')).toEqual("Invalid email format, proper format is 'user@example.com'")
    expect(validateEmail('user@com.1')).toEqual("Invalid email format, proper format is 'user@example.com'")
    expect(validateEmail('user@example.c')).toEqual("Invalid email format, proper format is 'user@example.com'")
  })
  test('should return null', () => {
    expect(validateEmail('test@example.com')).toEqual(null)
    expect(validateEmail('user.name+tag@example.co.uk')).toEqual(null)
    expect(validateEmail('user_name@example.org')).toEqual(null)
    expect(validateEmail('user-name@example.com')).toEqual(null)
    expect(validateEmail('user123@example.net')).toEqual(null)
    expect(validateEmail('user_123@exam.ru')).toEqual(null)
  })
})

describe('passwordValidation', () => {
  test('should return error text', () => {
    expect(validatePassword('a')).toEqual('Password should be at least 8 characters')
    expect(validatePassword('short1')).toEqual('Password should be at least 8 characters')
    expect(validatePassword('NoDigits')).toEqual('Password should include numbers')
    expect(validatePassword('12345678')).toEqual('Password should include uppercase letters')
    expect(validatePassword('NOLOWERCASE1')).toEqual('Password should include lowercase letters')
    expect(validatePassword('nouppercase1')).toEqual('Password should include uppercase letters')
    expect(validatePassword('Spaces NotAllowed1')).toEqual('Password should not include whitespaces')
    expect(validatePassword(' ')).toEqual('Password should not include whitespaces')
    expect(validatePassword('Password ')).toEqual('Password should not include whitespaces')
    expect(validatePassword(' Password1')).toEqual('Password should not include whitespaces')
  })
  test('should return null', () => {
    expect(validatePassword('aEr23trfg')).toEqual(null)
    expect(validatePassword('Password1')).toEqual(null)
    expect(validatePassword('ValidPass123')).toEqual(null)
    expect(validatePassword('StrongPass!4')).toEqual(null)
    expect(validatePassword('NoSpaces1')).toEqual(null)
  })
})

describe('firstNameValidation', () => {
  test('should return error text', () => {
    expect(validateFirstName('')).toEqual('First name cannot be empty')
    expect(validateFirstName('name#')).toEqual('First name cannot include special characters')
    expect(validateFirstName('name%')).toEqual('First name cannot include special characters')
    expect(validateFirstName('name-')).toEqual('First name cannot include special characters')
    expect(validateFirstName('name_')).toEqual('First name cannot include special characters')
    expect(validateFirstName('name$')).toEqual('First name cannot include special characters')
    expect(validateFirstName('name*')).toEqual('First name cannot include special characters')
    expect(validateFirstName('name8')).toEqual('First name cannot include numbers')
    expect(validateFirstName('v0t')).toEqual('First name cannot include numbers')
    expect(validateFirstName('76name')).toEqual('First name cannot include numbers')
  })
  test('should return null', () => {
    expect(validateFirstName('J')).toEqual(null)
    expect(validateFirstName('Jonn')).toEqual(null)
    expect(validateFirstName('Jonn Snow')).toEqual(null)
    expect(validateFirstName('r')).toEqual(null)
  })
})

describe('lastNameValidation', () => {
  test('should return error text', () => {
    expect(validateLastName('')).toEqual('Last name cannot be empty')
    expect(validateLastName('name#')).toEqual('Last name cannot include special characters')
    expect(validateLastName('name%')).toEqual('Last name cannot include special characters')
    expect(validateLastName('name-')).toEqual('Last name cannot include special characters')
    expect(validateLastName('name_')).toEqual('Last name cannot include special characters')
    expect(validateLastName('name$')).toEqual('Last name cannot include special characters')
    expect(validateLastName('name*')).toEqual('Last name cannot include special characters')
    expect(validateLastName('name8')).toEqual('Last name cannot include numbers')
    expect(validateLastName('v0t')).toEqual('Last name cannot include numbers')
    expect(validateLastName('76name')).toEqual('Last name cannot include numbers')
  })
  test('should return null', () => {
    expect(validateLastName('J')).toEqual(null)
    expect(validateLastName('Jonn')).toEqual(null)
    expect(validateFirstName('Jonn Snow')).toEqual(null)
    expect(validateLastName('r')).toEqual(null)
  })
})

describe('birthDateValidation', () => {
  test('should return error text', () => {
    expect(validateBirthDate('')).toEqual('Date of birthday cannot be empty')
    expect(validateBirthDate('2012-01-02')).toEqual('You should have 13 or more years')
    expect(validateBirthDate('2019-05-01')).toEqual('You should have 13 or more years')
    expect(validateBirthDate('2027-01-01')).toEqual('You should have 13 or more years')
  })
  test('should return null', () => {
    expect(validateBirthDate('2012-01-01')).toEqual(null)
    expect(validateBirthDate('2010-06-13')).toEqual(null)
    expect(validateBirthDate('1991-11-11')).toEqual(null)
  })
})

describe('streetValidation', () => {
  test('should return error text', () => {
    expect(validateStreet('')).toEqual('Street cannot be empty')
  })
  test('should return null', () => {
    expect(validateStreet('J')).toEqual(null)
    expect(validateStreet('Baker')).toEqual(null)
    expect(validateStreet('Baker Street')).toEqual(null)
    expect(validateStreet('Pr.')).toEqual(null)
  })
})

describe('cityValidation', () => {
  test('should return error text', () => {
    expect(validateCity('')).toEqual('City cannot be empty')
    expect(validateCity('name#')).toEqual('City cannot include special characters')
    expect(validateCity('name%')).toEqual('City cannot include special characters')
    expect(validateCity('name-')).toEqual('City cannot include special characters')
    expect(validateCity('name_')).toEqual('City cannot include special characters')
    expect(validateCity('name$')).toEqual('City cannot include special characters')
    expect(validateCity('name*')).toEqual('City cannot include special characters')
    expect(validateCity('67name8')).toEqual('City cannot include numbers')
    expect(validateCity('4')).toEqual('City cannot include numbers')
    expect(validateCity('v0tyff')).toEqual('City cannot include numbers')
  })
  test('should return null', () => {
    expect(validateCity('J')).toEqual(null)
    expect(validateCity('Baden Baden')).toEqual(null)
    expect(validateCity('London')).toEqual(null)
    expect(validateCity('Warshaw')).toEqual(null)
    expect(validateCity('Madrid')).toEqual(null)
  })
})

describe('countryValidation', () => {
  test('should return error text', () => {
    expect(validaCountry('')).toEqual('Country must not be empty')
    expect(validaCountry('Germany')).toEqual('Country must from a predefined list')
    expect(validaCountry('Belarus')).toEqual('Country must from a predefined list')
  })
  test('should return null', () => {
    expect(validaCountry('United Kingdom')).toEqual(null)
    expect(validaCountry('Poland')).toEqual(null)
    expect(validaCountry('Spain')).toEqual(null)
  })
})

describe('postCodeValidation', () => {
  test('should return error text', () => {
    expect(validatePostCode('56432', state1)).toEqual('Choose your country')
    expect(validatePostCode('56432', state2)).toEqual('Choose your country')
    expect(validatePostCode('', state3)).toEqual('Post code cannot be empty')
    expect(validatePostCode('00-001', state3)).toEqual('Post code of United Kingdom must be format "W1U 8ED"')
    expect(validatePostCode('W1U 8ED', state4)).toEqual('Post code of Poland must be format "00-001"')
    expect(validatePostCode('W1U 8ED', state5)).toEqual('Post code of Spain must be format "08830"')
  })
  test('should return null', () => {
    expect(validatePostCode('W1U 6AE', state3)).toEqual(null)
    expect(validatePostCode('01-962', state4)).toEqual(null)
    expect(validatePostCode('29700', state5)).toEqual(null)
  })
})
