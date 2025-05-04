import { Label } from '@/shared/ui/Label/Label.tsx'
import { Input } from '@/shared/ui/Input/Input.tsx'
import { useState } from 'react'
import type { JSX } from 'react'
import * as React from 'react'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import { Button } from '@/shared/ui/Button/Button.tsx'

export const PasswordInput = ({
  errors = null,
  onChange = Function,
}: {
  errors: string | null | undefined
  onChange: (password: string) => void
}): JSX.Element => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setPassword(value)
    onChange(value)
  }

  const handleKeyDown = (): void => {
    onChange(password)
  }

  return (
    <div className="form__item">
      <Label htmlFor={'password'} className={['form__label']}>
        Password
      </Label>
      <Input
        id={'password'}
        value={password}
        type={showPassword ? 'text' : 'password'}
        name="password"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
        className={['form__input', errors ? 'input--error' : '']}
        placeholder="Kedavra"
      />
      {errors && <span className="form__error">{errors}</span>}
      <Button
        type="button"
        classNames={['form__button', 'visibility']}
        onClick={() => setShowPassword((previous) => !previous)}
      >
        {showPassword ? <LuEye /> : <LuEyeClosed />}
      </Button>
    </div>
  )
}
