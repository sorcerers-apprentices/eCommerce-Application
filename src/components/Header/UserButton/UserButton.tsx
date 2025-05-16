import type { JSX } from 'react'
import { useEffect, useRef, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { UserMenu } from '.././UserMenu/UserMenu'
import s from './UserButton.module.scss'
export const UserButton = (): JSX.Element => {
  const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false)
  const menuReference = useRef<HTMLDivElement | null>(null)
  const handleClick = (): void => {
    setOpen((previous: boolean) => !previous)
  }
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
      <button className={s.button} onClick={handleClick}>
        {open ? <IoClose /> : <FaRegUser />}
      </button>
      {open && <UserMenu />}
      {open && <div className={s.overlay} onClick={() => setOpen(false)} />}
    </div>
  )
}
