import type { ButtonHTMLAttributes, FC } from 'react'
import s from './Button.module.scss'

type TButtonProperties = ButtonHTMLAttributes<HTMLButtonElement> & {
  noDefaultStyle?: boolean
}
export const Button: FC<TButtonProperties> = ({ children, className, noDefaultStyle = false, ...rest }) => {
  const finalClass = noDefaultStyle ? className : `${s.btn} ${className ?? ''}`
  return (
    <button {...rest} className={finalClass}>
      {children}
    </button>
  )
}
