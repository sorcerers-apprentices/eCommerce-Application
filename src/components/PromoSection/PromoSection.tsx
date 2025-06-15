import type { ReactElement } from 'react'
import s from './PromoSection.module.scss'
import { ArrowSlider } from '@/shared/ui/ArrowSlider/ArrowSlider'

export const PromoSection = (): ReactElement => {
  const slides = [
    <div className={s.slide}>
      <h2>For all pet lovers and magic believers!</h2>
      <p>Use promo code</p>
      <h2 className="title">Reviewer20</h2>
      <p>and enjoy 20% discount for all goods</p>
    </div>,
    <div className={s.slide}>
      <h2>For all dog owners!</h2>
      <p>Use promo code</p>
      <h2 className={`title ${s.title}`}>Dog-food-10</h2>
      <p>and enjoy 10% discount for dog food</p>
    </div>,
  ]
  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.image}></div>
        <div className={s.content}>
          <ArrowSlider slides={slides} />
        </div>
      </div>
    </section>
  )
}
