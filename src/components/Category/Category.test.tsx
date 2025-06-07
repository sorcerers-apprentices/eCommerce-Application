import { Category } from './Category'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Category Component', () => {
  test('Render Component', () => {
    render(
      <MemoryRouter>
        <Category />
      </MemoryRouter>
    )
  })
})
