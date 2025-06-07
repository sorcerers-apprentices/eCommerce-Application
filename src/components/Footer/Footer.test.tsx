import Footer from './Footer'
import { render, screen } from '@testing-library/react'

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  test('Render text in component', () => {
    expect(screen.getByText('21 New York Street')).toBeInTheDocument()
    expect(screen.getByText('New York City')).toBeInTheDocument()
    expect(screen.getByText('United States of America')).toBeInTheDocument()
    expect(screen.getByText('432 34')).toBeInTheDocument()
  })
})
