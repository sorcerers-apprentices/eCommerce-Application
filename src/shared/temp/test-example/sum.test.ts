import { sum } from './sum.ts'

const number1 = 2
const number2 = 3

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, number1)).toBe(number2)
})
