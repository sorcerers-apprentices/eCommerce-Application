import { Button } from '@/shared/ui/Button/Button'
import type { FC } from 'react'

export const FormButton: FC<{ disabled?: boolean; value?: string }> = ({ disabled = true, value = 'Submit' }) => {
  return (
    <Button type="submit" classNames={['form__button']} disabled={disabled}>
      {value}
    </Button>
  )
}
