import React, { type ReactElement } from 'react'
import s from './Modal.module.scss'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps): ReactElement | undefined => {
  if (!isOpen) return

  return (
    <div className={s.modaloverlay} onClick={onClose}>
      <div className={s.modalcontent} onClick={(e) => e.stopPropagation()}>
        <button className={s.modalclose} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
