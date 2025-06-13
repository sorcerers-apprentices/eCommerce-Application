import type { ReactElement } from 'react'
import s from './PromoSection.module.scss'

export const PromoSection = (): ReactElement => {
  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.image}></div>
        <div className={s.content}>
          <h2>For all pet lovers and magic believers!</h2>
          <p>use promo code</p>
          <h2 className="title">Reviewer20</h2>
          <p>and enjoy 20% discount!</p>
        </div>
      </div>
    </section>
  )
}
