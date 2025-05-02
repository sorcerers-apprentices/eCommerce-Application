import { Label } from '@/shared/ui/Label/Label'
import { Input } from '@/shared/ui/Input/Input'
import type { JSX } from 'react'

export const PasswordInput = (): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value)
  }
  const id = 'password'
  return (
    <>
      <Label htmlFor={id} className={['form__label']}>
        Password
      </Label>
      <Input
        id={id}
        type="password"
        name="password"
        onChange={handleChange}
        required
        className={['form__input']}
        placeholder="**************"
      />
    </>
  )
}
