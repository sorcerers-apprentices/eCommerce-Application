import type { JSX } from 'react'
import { useEffect, useRef, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { UserMenu } from '.././UserMenu/UserMenu'
import s from './UserButton.module.scss'

export const UserButton = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const menuReference = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuReference.current && event.target instanceof Node && !menuReference.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={menuReference} className={s.wrapper}>
      <button
        className={s.button}
        onClick={(): void => {
          setOpen((previous) => !previous)
        }}
      >
        {open ? <IoClose className="icon" /> : <FaRegUser className="icon" />}
      </button>
      {open && (
        <>
          <UserMenu onClose={() => setOpen(false)} />
          <div className={s.overlay} onClick={() => setOpen(false)} />
        </>
      )}
    </div>
  )
}
