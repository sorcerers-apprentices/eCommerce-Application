import type { LabelHTMLAttributes } from 'react'

type TLabelProperties = LabelHTMLAttributes<HTMLLabelElement>

export const Label: React.FC<TLabelProperties> = ({ children, ...rest }) => {
  return <label {...rest}>{children}</label>
}
