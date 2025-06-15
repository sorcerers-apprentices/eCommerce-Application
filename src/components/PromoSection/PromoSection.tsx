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
          <p>and enjoy 20% discount for all goods</p>
          <p>and</p>
          <h2 className={`title ${s.title}`}>Dog-food-10</h2>
          <p>10% discount for dog food</p>
        </div>
      </div>
    </section>
  )
}
