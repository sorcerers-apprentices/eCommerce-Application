import type { SelectHTMLAttributes } from 'react'
import { type FC } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'
import s from './SelectInput.module.scss'

type TSelectProperties = SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[]
  title: string
  errors?: string | null
}

export const SelectInput: FC<TSelectProperties> = ({
  name,
  title,
  options = [],
  value,
  required = true,
  errors,
  ...rest
}) => {
  const errorInnerText = errors ? errors : '\u00A0'
  return (
    <div className={s.element}>
      <Label htmlFor={name} className={s.label}>
        {title}
      </Label>
      <select {...rest} id={name} name={name} value={value} className={s.input} required={required}>
        <option className={s.input} value="">
          Choose your {name}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className={s.error}>{errorInnerText}</span>
    </div>
  )
}
