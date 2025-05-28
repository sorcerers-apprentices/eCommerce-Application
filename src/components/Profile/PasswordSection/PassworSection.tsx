import { useContext, useState, type ChangeEvent, type ReactElement } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import { Form } from '@/shared/ui/Form/Form'
import s from './PasswordSection.module.scss'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { updatePasswordApi } from '@/server/updatePasswordApi'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { userContext } from '@/app/providers/UserProvider/UserContext'
import { useAuth } from '@/hooks/useAuth'

export const PasswordSection = (): ReactElement => {
  const navigation = useNavigate()
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const { state } = useContext(userContext)
  const email = state.email
  const { login, logout } = useAuth()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setPasswords((previous) => ({ ...previous, [name]: value }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const { currentPassword, newPassword, confirmPassword } = passwords

    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match')
      return
    }

    try {
      await updatePasswordApi({
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      await logout()
      await login(email ?? '', newPassword)
      toast.success('Password has been changed successfully')
      navigation(RoutePath.PROFILE)
    } catch (error) {
      toast.error(`${error} Password has not been changed`)
    }
  }
  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <h2 className="title">Password</h2>
          <Form onSubmit={handleSubmit}>
            <InputComponent
              name="currentPassword"
              type="password"
              title="Current password"
              isPassword={true}
              errors={null}
              onChange={handleChange}
              placeholder="Password123"
            />
            <InputComponent
              name="newPassword"
              type="password"
              title="New password"
              isPassword={true}
              errors={null}
              onChange={handleChange}
              placeholder="newPassword123"
            />
            <InputComponent
              name="confirmPassword"
              type="password"
              title="Confim new password"
              isPassword={true}
              errors={null}
              onChange={handleChange}
              placeholder="newPassword123"
            />

            <div className={s.buttons}>
              <Button onClick={() => {}}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </div>
        <div className={s.image}></div>
      </div>
    </section>
  )
}
