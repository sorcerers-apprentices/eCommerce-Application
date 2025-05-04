import { Label } from '@/shared/ui/Label/Label.tsx'
import { Input } from '@/shared/ui/Input/Input.tsx'
import { type ChangeEvent } from 'react'
import type { JSX } from 'react'

export const EmailInput = ({
  errors = null,
  onChange = Function,
}: {
  errors: string | null | undefined
  onChange: (email: string) => void
}): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    onChange(value)
  }

  return (
    <div className="form__item">
      <Label htmlFor={'email'} className={['form__label']}>
        Email
      </Label>
      <Input
        id={'email'}
        type="email"
        name="email"
        allowWhitespaces={false}
        onChange={handleChange}
        required
        className={['form__input', errors ? 'input--error' : '']}
        placeholder="Avada"
      />
      {errors && <span className="form__error">{errors}</span>}
    </div>
  )
}
