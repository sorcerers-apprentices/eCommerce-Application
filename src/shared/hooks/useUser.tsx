import { useContext } from 'react'
import { type UserContextType, UserContext } from '@/app/providers/UserProvider/UserContext'

export const useUser = (): UserContextType => {
  const user: UserContextType = useContext(UserContext)
  if (!user) {
    throw new Error('Missing User Context')
  }
  return user
}
