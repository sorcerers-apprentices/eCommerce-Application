import type { FC, InputHTMLAttributes } from 'react'
import { Label } from '../Label/Label'
import s from './Checkbox.module.scss'

type TCheckboxProperties = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  title: string
}

export const Checkbox: FC<TCheckboxProperties> = ({ id, title, ...rest }) => {
  return (
    <div className={s.checkbox}>
      <input id={id} name={id} type={'checkbox'} {...rest} className={s.input} />
      <Label htmlFor={id} children={title} className={s.lable} />
    </div>
  )
}
