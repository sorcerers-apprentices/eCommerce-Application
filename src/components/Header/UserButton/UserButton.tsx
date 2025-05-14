import type { JSX } from 'react'
import { useState } from 'react'
// import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { FaRegUser } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { UserMenu } from '.././UserMenu/UserMenu'
// import { useNavigate } from 'react-router'
// import { useAuth } from '@/hooks/useAuth'
// import { useUser } from '@/hooks/useUser'

import s from './UserButton.module.scss'
export const UserButton = (): JSX.Element => {
  const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false)
  // const { state } = useUser()
  // const { logout } = useAuth()
  // const navigate = useNavigate()

  // const handleClick = async (): Promise<void> => {
  //   if (!state.isAuth) {
  //     navigate(RoutePath.LOGIN)
  //   } else if (state.username === '') {
  //     await logout()
  //   } else {
  //     navigate(RoutePath.PROFILE)
  //   }
  // }
  const handleClick = (): void => {
    setOpen((previous: boolean) => !previous)
  }

  return (
    <>
      <button className={s.button} onClick={handleClick}>
        {open ? <IoClose /> : <FaRegUser />}
      </button>
      {open && <UserMenu />}
    </>
  )
}
