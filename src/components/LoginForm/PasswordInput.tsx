import { Label } from '@/shared/ui/Label/Label'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { useState } from 'react'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import type { JSX } from 'react'

export const PasswordInput = (): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value)
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }
  const id = 'password'
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="form__item">
      <Label htmlFor={id} className={['form__label']}>
        Password
      </Label>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        name="password"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
        className={['form__input']}
        placeholder="Kedavra"
      />
      <Button
        type="button"
        className={['form__button', 'visibility']}
        onClick={() => setShowPassword((previous) => !previous)}
      >
        {showPassword ? <LuEye /> : <LuEyeClosed />}
      </Button>
    </div>
  )
}
