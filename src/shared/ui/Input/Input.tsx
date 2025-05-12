import type { FC, KeyboardEvent, InputHTMLAttributes } from 'react'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'date'

type TInputProperties = InputHTMLAttributes<HTMLInputElement> & {
  allowWhitespaces?: boolean
}

export const Input: FC<TInputProperties> = ({ onKeyDown, allowWhitespaces = true, ...rest }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!allowWhitespaces && /\s/.test(event.key)) {
      event.preventDefault()
    } else {
      onKeyDown?.(event)
    }
  }

  return <input {...rest} onKeyDown={handleKeyDown} />
}
