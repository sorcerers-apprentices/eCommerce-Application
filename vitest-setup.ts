import { vi } from 'vitest'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest'

vi.stubGlobal('scrollTo', () => {})

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  value: () => {},
})
