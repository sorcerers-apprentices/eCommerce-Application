type TInputProperties = {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string[]
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  name?: string
  required?: boolean
}

export const Input: React.FC<TInputProperties> = ({
  value,
  onChange,
  placeholder,
  className = [],
  type,
  name,
  required = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      required={required}
      className={['input', ...className].join(' ')}
    />
  )
}
