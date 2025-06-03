import type { SelectHTMLAttributes } from 'react'
import { type FC } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'
import s from './SelectInput.module.scss'

type TSelectProperties = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: string[]
  options2?: { text: string; value: string }[]
  title: string
  errors?: string | null
  className?: string
}

export const SelectInput: FC<TSelectProperties> = ({
  name,
  title,
  options = [],
  options2 = [],
  value,
  required = true,
  errors,
  className,
  ...rest
}) => {
  const errorInnerText = errors ? errors : '\u00A0'
  return (
    <div className={s.element + ' ' + className}>
      <Label htmlFor={name} className={s.label}>
        {title}
      </Label>
      <select {...rest} id={name} name={name} value={value} className={s.input} required={required}>
        <option className={s.input} value="">
          Choose {name}
        </option>
        {options2.length &&
          options2.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        {options.length &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      <span className={s.error}>{errorInnerText}</span>
    </div>
  )
}
