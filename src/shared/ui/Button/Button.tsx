import type { ButtonHTMLAttributes, FC } from 'react'
import s from './Button.module.scss'

type TButtonProperties = ButtonHTMLAttributes<HTMLButtonElement> & {
  classNames?: string[]
}

export const Button: FC<TButtonProperties> = ({ classNames = [], children, ...rest }) => {
  return (
    <button {...rest} className={[s.btn, ...classNames.map((name) => s[name])].join(' ')}>
      {children}
    </button>
  )
}
