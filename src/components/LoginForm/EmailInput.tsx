import { Label } from '@/shared/ui/Label/Label'
import { Input } from '@/shared/ui/Input/Input'
import { useState } from 'react'
import type { JSX } from 'react'

export const EmailInput = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setEmail(value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setError('Please enter a valid email')
    } else {
      setError(null)
    }
    console.log(email)
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }
  const id = 'email'
  return (
    <div className="form__item">
      <Label htmlFor={id} className={['form__label']}>
        Email
      </Label>
      <Input
        id={id}
        type="email"
        name="email"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        required
        className={['form__input', error ? 'input--error' : '']}
        placeholder="Avada"
      />
      {error && <span className="form__error">{error}</span>}
    </div>
  )
}
