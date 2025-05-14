import { type ChangeEvent, type FC, type InputHTMLAttributes, useState } from 'react'
import './Toggler.scss'

type TogglerProperties = {
  label: string
  onToggle: (event: ChangeEvent<HTMLInputElement>) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onToggle'>

export const Toggler: FC<TogglerProperties> = ({ label, onToggle }: TogglerProperties) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(!isChecked)
    if (onToggle) {
      onToggle(event)
    }
  }

  return (
    <label className="toggler">
      <input type="checkbox" checked={isChecked} onChange={handleChange} className="toggler-input" />
      <div className="toggler-state">
        <div className="toggler-control">
          <div className="toggler-switch"></div>
        </div>
        <span className="toggler-title">{label}</span>
      </div>
    </label>
  )
}
