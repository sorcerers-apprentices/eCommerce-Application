import { classNames } from './classNames'

describe('classNames', (): void => {
  test('with only first param', (): void => {
    expect(classNames('someClass')).toBe('someClass')
  })

  test('with additional class', (): void => {
    const expected = 'someClass class1 class2'
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected)
  })

  test('with mods class', (): void => {
    const expected = 'someClass class1 class2 open close'
    expect(classNames('someClass', { open: true, close: true }, ['class1', 'class2'])).toBe(expected)
  })

  test('with mods false', (): void => {
    const expected = 'someClass class1 class2 open'
    expect(classNames('someClass', { open: true, close: false }, ['class1', 'class2'])).toBe(expected)
  })
})
