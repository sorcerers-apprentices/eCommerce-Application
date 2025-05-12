import { type InputHTMLAttributes, type FC, useState } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button.tsx'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import s from './InputComponent.module.scss'

type InputComponentProperties = InputHTMLAttributes<HTMLInputElement> & {
  allowWhitespaces?: boolean
  title: string
  errors?: string | null
  isPassword?: boolean
}

export const InputComponent: FC<InputComponentProperties> = ({
  name,
  title,
  type,
  errors = null,
  isPassword = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const errorInnerText = errors ? errors : '\u00A0'

  return (
    <div className={s.element}>
      <Label htmlFor={name} className={s.label}>
        {title}
      </Label>
      <div className={s.row}>
        <Input
          {...rest}
          id={name}
          type={!isPassword ? type : showPassword ? 'text' : 'password'}
          name={name}
          className={`${s.input} ${errors ? `${s.input__error}` : ''}`}
        />

        {isPassword && (
          <Button
            noDefaultStyle
            className={s.visibility}
            type="button"
            onClick={() => setShowPassword((previous: boolean) => !previous)}
          >
            {showPassword ? <LuEye /> : <LuEyeClosed />}
          </Button>
        )}
      </div>
      <span className={s.error}>{errorInnerText}</span>
    </div>
  )
}
