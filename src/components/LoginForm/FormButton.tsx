import { Button } from '@/shared/ui/Button/Button'
import type { JSX } from 'react'

export const FormButton = ({ disabled = true }: { disabled: boolean }): JSX.Element => {
  return (
    <Button type="submit" classNames={['form__button']} disabled={disabled}>
      Login
    </Button>
  )
}
