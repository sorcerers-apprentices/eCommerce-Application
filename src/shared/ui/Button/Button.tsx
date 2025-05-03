import type { FC, ReactNode } from 'react'

type TButtonProperties = {
  children: ReactNode
  onClick?: () => void
  classNames?: string[]
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const Button: FC<TButtonProperties> = ({
  children,
  onClick,
  classNames = [],
  type = 'button',
  disabled = false,
}) => {
  return (
    <button type={type} className={['btn', ...classNames].join(' ')} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
