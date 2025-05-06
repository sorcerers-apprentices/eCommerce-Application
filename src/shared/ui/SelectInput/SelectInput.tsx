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
}

export const SelectInput: FC<SelectProperties> = ({
  name,
  label,
  options = [],
  value,
  required = true,
  disabled = false,
  errors,
  onChange = Function.prototype,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onChange(event)
  }

  return (
    <div className="form__item">
      <Label htmlFor={name} className={['form__label']}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        value={value}
        className={['input', 'form__input', errors ? 'input--error' : ''].join(' ')}
        required={required}
        disabled={disabled}
        onChange={handleChange}
      >
        <option value="">Choose your {name}</option>
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
