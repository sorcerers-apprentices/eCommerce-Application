import { LuEye, LuEyeClosed } from 'react-icons/lu'
import { Button } from '@/shared/ui/Button/Button.tsx'
import type { JSX } from 'react'

export const TogglePasswordButton = ({ show, toggle }: { show: boolean; toggle: () => void }): JSX.Element => (
  <Button type="button" classNames={['form__button', 'visibility']} onClick={toggle}>
    {show ? <LuEye /> : <LuEyeClosed />}
  </Button>
)
