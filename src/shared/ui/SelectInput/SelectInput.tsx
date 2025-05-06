import { type FC, type ChangeEvent } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'

type SelectProperties = {
  name: string
  label: string
  options: string[]
  value?: string
  className?: string
  required?: boolean
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  errors?: string | null
  checkErrors?: (value: string) => void
}

export const SelectInput: FC<SelectProperties> = ({
  name,
  label,
  options = [],
  value,
  required = true,
  disabled = false,
  errors,
  checkErrors = Function,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    checkErrors(value)
  }

  return (
    <div className="form__item">
      <Label htmlFor={name} className={['form__label']}>
        {label}
      </Label>
      <select
        name={name}
        value={value}
        className={['input', 'form__input', errors ? 'input--error' : ''].join(' ')}
        required={required}
        disabled={disabled}
        onChange={handleChange}
      >
        <option>Choose your {value}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors && <span className="form__error">{errors}</span>}
    </div>
  )
}
