import { useContext } from 'react'
import { type UserContext, userContext } from '@/app/providers/UserProvider/UserContext'

export const useUserContext = (): UserContext => {
  const user = useContext(userContext)
  if (!user) {
    throw new Error('Missing User Context')
  }
  return user
}
