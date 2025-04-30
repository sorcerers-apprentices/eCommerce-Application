type TButtonProperties = {
  children: React.ReactNode
  onClick?: () => void
  className?: string[]
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<TButtonProperties> = ({ children, onClick, className = [], type = 'button' }) => {
  return (
    <button type={type} className={['btn', ...className].join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}
