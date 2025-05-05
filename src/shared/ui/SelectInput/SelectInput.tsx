import { type FC, type ChangeEvent } from 'react'

type TSelectProperties = {
  name: string
  value?: string
  options: string[]
  className?: string[]
  required?: boolean
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectInput: FC<TSelectProperties> = ({
  name,
  value,
  options = [],
  className = [],
  required = false,
  disabled = false,
  onChange,
}) => {
  return (
    <select
      name={name}
      value={value}
      className={['input', ...className].join(' ')}
      required={required}
      disabled={disabled}
      onChange={onChange}
    >
      <option>Choose your {value}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
