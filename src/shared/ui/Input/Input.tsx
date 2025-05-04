import type { FC, KeyboardEvent, ChangeEvent } from 'react'

type TInputProperties = {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string[]
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  name?: string
  required?: boolean
  id?: string
  disabled?: boolean
  allowWhitespaces?: boolean
}

export const Input: FC<TInputProperties> = ({
  value,
  onChange,
  onKeyDown = Function.prototype,
  id,
  placeholder,
  className = [],
  type,
  name,
  required = false,
  disabled = false,
  allowWhitespaces = true,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!allowWhitespaces && /\s/.test(event.key)) {
      event.preventDefault()
    } else {
      onKeyDown(event)
    }
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      required={required}
      className={['input', ...className].join(' ')}
    />
  )
}
