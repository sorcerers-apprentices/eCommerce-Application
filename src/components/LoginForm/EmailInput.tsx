import { Label } from '@/shared/ui/Label/Label'
import { Input } from '@/shared/ui/Input/Input'
import type { JSX } from 'react'

export const EmailInput = (): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value)
  }
  const id = 'email'
  return (
    <>
      <Label htmlFor={id} className={['form__label']}>
        Email
      </Label>
      <Input
        id={id}
        type="email"
        name="email"
        onChange={handleChange}
        required
        className={['form__input']}
        placeholder="user@example.com"
      />
    </>
  )
}
