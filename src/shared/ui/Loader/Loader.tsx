import s from './Loader.module.scss'
import type { ReactElement } from 'react'

const Loader = (): ReactElement => {
  return (
    <div className={s.lds}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
