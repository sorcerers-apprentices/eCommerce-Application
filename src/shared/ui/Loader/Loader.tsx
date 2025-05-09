import s from './Loader.module.scss'
import type { ReactElement } from 'react'

const Loader = (): ReactElement => {
  const NUMBER_OF_DOTS = 12
  return (
    <div className={s.lds}>
      {Array.from({ length: NUMBER_OF_DOTS }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  )
}

export default Loader
