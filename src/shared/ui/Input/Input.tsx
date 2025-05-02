type TInputProperties = {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string[]
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  name?: string
  required?: boolean
  id?: string
  disabled?: boolean
}

export const Input: React.FC<TInputProperties> = ({
  value,
  onChange,
  onKeyDown,
  id,
  placeholder,
  className = [],
  type,
  name,
  required = false,
  disabled = false,
}: TInputProperties & {}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      required={required}
      className={['input', ...className].join(' ')}
    />
  )
}
