import { Button } from '@/shared/ui/Button/Button'
import type { JSX } from 'react'

export const FormButton = (): JSX.Element => {
  return (
    <Button type="submit" className={['form__button']} onClick={() => {}}>
      Login
    </Button>
  )
}
