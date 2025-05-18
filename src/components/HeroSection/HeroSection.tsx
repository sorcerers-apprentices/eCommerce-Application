import type { ReactElement } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import s from './HeroSection.module.scss'

export const HeroSection = (): ReactElement => {
  return (
    <section className={`${s.hero}`}>
      <h2 className={s.title}>Unique shop for your pet</h2>
      <Button>Go to catalog</Button>
    </section>
  )
}
