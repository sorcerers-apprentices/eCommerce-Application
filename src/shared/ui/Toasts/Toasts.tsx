import s from './Toasts.module.scss'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { type ReactElement, useEffect, useState } from 'react'
import { BiSolidError, BiSolidErrorCircle } from 'react-icons/bi'

type ToastProperties = {
  type: 'error' | 'info' | 'warning' | 'success'
  message: string
}

const toastDisplayTime = 3000

const Toast = (parameter: ToastProperties): ReactElement | null => {
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

  const getToastIcon = (): ReactElement | null => {
    switch (parameter.type) {
      case 'success':
        return <IoCheckmarkCircle color="white" size={20} />
      case 'warning':
        return <BiSolidError color="white" size={20} />
      case 'error':
        return <BiSolidError color="white" size={20} />
      case 'info':
        return <BiSolidErrorCircle color="white" size={20} />
      default:
        return null
    }
  }

  if (!isVisible) return null

  return (
    <div className={getToastClassName()}>
      {getToastIcon()}
      <p className={s.text}>{parameter.message}</p>
    </div>
  )
}

export default Toast
