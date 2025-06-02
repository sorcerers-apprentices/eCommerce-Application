import React, { type ReactElement } from 'react'
import s from './Modal.module.scss'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}
export const Modal = ({ isOpen, onClose, children, className }: ModalProps): ReactElement | undefined => {
  if (!isOpen) return

  return (
    <div className={s.modaloverlay} onClick={onClose}>
      <div className={[s.modalcontent, className].join(' ')} onClick={(e) => e.stopPropagation()}>
        <button className={s.modalclose} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
