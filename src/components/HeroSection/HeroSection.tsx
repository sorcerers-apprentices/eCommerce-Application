import type { ReactElement } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import s from './HeroSection.module.scss'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig.tsx'
import { NavLink } from 'react-router'

export const HeroSection = (): ReactElement => {
  return (
    <section className={`${s.hero}`}>
      <h2 className={s.title}>Unique shop for your pet</h2>
      <NavLink to={RoutePath.CATALOG}>
        <Button>Go to catalog</Button>
      </NavLink>
    </section>
  )
}
