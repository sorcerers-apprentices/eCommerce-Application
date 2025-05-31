import { IoCloseSharp } from 'react-icons/io5'
import s from './Modal.module.scss'

type TModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<TModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    onClose()
  }

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className="icon" onClick={onClose} aria-label="Close modal">
          <IoCloseSharp />
        </button>
        {children}
      </div>
    </div>
  )
}
