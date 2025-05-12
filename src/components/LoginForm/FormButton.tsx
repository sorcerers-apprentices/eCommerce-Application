import { Button } from '@/shared/ui/Button/Button'
import type { FC } from 'react'
import s from './FormButton.module.scss'

export const FormButton: FC<{ disabled?: boolean; value?: string }> = ({ disabled = true, value = 'Submit' }) => {
  return (
    <Button type="submit" className={s.button} disabled={disabled}>
      {value}
    </Button>
  )
}
