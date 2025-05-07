import { type ChangeEvent, type FC, useState } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'
import { Input, type InputType } from '@/shared/ui/InputComponent/Input/Input.tsx'
//import { Button } from '@/shared/ui/Button/Button.tsx'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import s from './InputComponent.module.scss'

export const InputComponent: FC<{
  name: string
  label: string
  type: InputType
  placeholder?: string
  errors?: string | null
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  isPassword?: boolean
  allowWhitespaces?: boolean
}> = ({
  name,
  label,
  type,
  placeholder,
  errors = null,
  value,
  onChange = Function.prototype,
  required = true,
  isPassword = false,
  allowWhitespaces = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event)
  }

  return (
    <div className={s.element}>
      <Label htmlFor={name} className={['form__label']}>
        {label}
      </Label>
      <Input
        value={value}
        id={name}
        type={!isPassword ? type : showPassword ? 'text' : 'password'}
        name={name}
        allowWhitespaces={allowWhitespaces}
        onChange={handleChange}
        required={required}
        className={[errors ? 'input--error' : '']}
        placeholder={placeholder}
      />
      {errors && <span className="form__error">{errors}</span>}
      {isPassword && (
        <button
          className={s.visibility}
          type="button"
          onClick={() => setShowPassword((previous: boolean) => !previous)}
        >
          {showPassword ? <LuEye /> : <LuEyeClosed />}
        </button>
      )}
    </div>
  )
}
