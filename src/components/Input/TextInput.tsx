import { Label } from '@/shared/ui/Label/Label.tsx'
import { Input } from '@/shared/ui/Input/Input.tsx'
import { type ChangeEvent, type FC, useState } from 'react'

export const TextInput: FC<{
  name: string
  label: string
  placeholder?: string
  errors?: string | null
  onChange?: (value: string) => void
  required?: boolean
}> = ({ name, label, placeholder = label, errors = null, onChange = Function, required = true }) => {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setValue(value)
    onChange(value)
  }

  return (
    <div className="form__item">
      <Label htmlFor={name} className={['form__label']}>
        {label}
      </Label>
      <Input
        value={value}
        type="text"
        name={name}
        onChange={handleChange}
        required={required}
        className={['form__input', errors ? 'input--error' : '']}
        placeholder={placeholder}
      />
      {errors && <span className="form__error">{errors}</span>}
    </div>
  )
}
