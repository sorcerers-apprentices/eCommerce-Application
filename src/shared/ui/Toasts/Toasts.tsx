import s from './Toasts.module.scss'
import { type ReactElement, useEffect, useState } from 'react'

type ToastProperties = {
  type: 'error' | 'info' | 'warning' | 'success'
  message: string
}

const toastDisplayTime = 3000

const Toast = (parameter: ToastProperties): ReactElement => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout((): void => {
      setIsVisible(false)
    }, toastDisplayTime)

    return (): void => clearTimeout(timer)
  })

  const getToastClassName = (): string => {
    return `${s.toast} ${s[parameter.type]}`
  }

  if (!isVisible) return <></>

  return (
    <div className={getToastClassName()}>
      <p>{parameter.message}</p>
    </div>
  )
}

export default Toast
