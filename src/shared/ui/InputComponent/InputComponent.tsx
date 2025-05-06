import { type ChangeEvent, type FC, useState } from 'react'
import { Label } from '@/shared/ui/Label/Label.tsx'
import { Input, type InputType } from '@/shared/ui/InputComponent/Input/Input.tsx'
import { Button } from '@/shared/ui/Button/Button.tsx'
import { LuEye, LuEyeClosed } from 'react-icons/lu'

export const InputComponent: FC<{
  name: string
  label: string
  type: InputType
  placeholder?: string
  errors?: string | null
  value?: string
  onChange2?: (event: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  isPassword?: boolean
}> = ({
  name,
  label,
  type,
  placeholder,
  errors = null,
  value,
  onChange2 = Function.prototype,
  required = true,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange2(event)
  }

  return (
    <div className="form__item">
      <Label htmlFor={name} className={['form__label']}>
        {label}
      </Label>
      <Input
        value={value}
        id={name}
        type={!isPassword ? type : showPassword ? 'text' : 'password'}
        name={name}
        allowWhitespaces={false}
        onChange={handleChange}
        required={required}
        className={['form__input', errors ? 'input--error' : '']}
        placeholder={placeholder}
      />
      {errors && <span className="form__error">{errors}</span>}
      {isPassword && (
        <Button
          type="button"
          classNames={['form__button', 'visibility']}
          onClick={() => setShowPassword((previous: boolean) => !previous)}
        >
          {showPassword ? <LuEye /> : <LuEyeClosed />}
        </Button>
      )}
    </div>
  )
}
