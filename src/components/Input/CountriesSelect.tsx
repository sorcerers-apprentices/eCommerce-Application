import { type ChangeEvent, type FC } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput.tsx'

export const CountriesSelect: FC<{
  name: string
  label: string
  value: string
  options: string[]
  errors?: string | null
  onChange?: (value: string) => void
  required?: boolean
  disabled?: boolean
}> = ({ name, label, value, options, errors = null, onChange = Function, required = true, disabled = false }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    onChange(value)
  }
  return (
    <div className="form__item">
      <Label htmlFor={name} className={['form__label']}>
        {label}
      </Label>
      <SelectInput
        name={name}
        value={value}
        options={options}
        required={required}
        disabled={disabled}
        className={['form__input', errors ? 'input--error' : '']}
        onChange={handleChange}
      />
      {errors && <span className="form__error">{errors}</span>}
    </div>
  )
}
