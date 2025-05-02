type TLabelProperties = {
  htmlFor?: string
  children?: React.ReactNode
  className?: string[]
}

export const Label: React.FC<TLabelProperties> = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={['label', ...className].join(' ')}>
      {children}
    </label>
  )
}
