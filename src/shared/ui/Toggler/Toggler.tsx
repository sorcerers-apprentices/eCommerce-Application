import { type ChangeEvent, type FC, type InputHTMLAttributes, useState } from 'react'
import './Toggler.scss'

type TogglerProperties = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export const Toggler: FC<TogglerProperties> = ({ name, label, onInput, ...rest }: TogglerProperties) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(!isChecked)
    if (onInput) {
      onInput(event)
    }
  }

  return (
    <label className="toggler">
      <input
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="toggler-input"
        {...rest}
      />
      <div className="toggler-state">
        <div className="toggler-control">
          <div className="toggler-switch"></div>
        </div>
        <span className="toggler-title">{label}</span>
      </div>
    </label>
  )
}
