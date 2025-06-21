import { Button } from './Button'
import { render, screen } from '@testing-library/react'

describe('Button Component', () => {
  test('Render Component', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })
})
