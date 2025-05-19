import s from './Form.module.scss'
type TFormProperties = {
  children: React.ReactNode
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  className?: string[]
}

export const Form: React.FC<TFormProperties> = ({ children, onSubmit, className = '' }) => {
  return (
    <form className={[s.form, ...className].join(' ')} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
