import { type ChangeEvent, type FC } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'
import { Input } from '@/shared/ui/Input/Input.tsx'

export const DateInput: FC<{
  name: string
  label: string
  errors?: string | null
  onChange?: (value: string) => void
  required?: boolean
}> = ({ name, label, errors = null, onChange = Function, required = true }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    onChange(value)
  }

  return (
    <div className="form__item">
      <Label htmlFor={name} className={['form__label']}>
        {label}
      </Label>
      <Input
        type="date"
        name={name}
        onChange={handleChange}
        required={required}
        className={['form__input', errors ? 'input--error' : '']}
      />
      {errors && <span className="form__error">{errors}</span>}
    </div>
  )
}
