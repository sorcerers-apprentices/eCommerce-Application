import s from './Modal.module.scss'
import React, { type ReactElement, useState } from 'react'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps): ReactElement | undefined => {
  const [mouseDownOnOverlay, setMouseDownOnOverlay] = useState(false)

  if (!isOpen) return

  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      setMouseDownOnOverlay(true)
    }
  }

  const handleOverlayMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (mouseDownOnOverlay && e.target === e.currentTarget) {
      onClose()
    }
    setMouseDownOnOverlay(false)
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }

  return (
    <div className={s.modaloverlay} onMouseDown={handleOverlayMouseDown} onMouseUp={handleOverlayMouseUp}>
      <div className={s.modalcontent} onMouseDown={stopPropagation} onMouseUp={stopPropagation}>
        <button className={s.modalclose} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
