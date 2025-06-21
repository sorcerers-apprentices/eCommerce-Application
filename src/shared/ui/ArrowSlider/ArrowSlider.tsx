import type { ReactElement } from 'react'
import { useState } from 'react'
import s from './ArrowSlider.module.scss'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'

type ArrowSliderProps = {
  slides: ReactElement[]
}

export const ArrowSlider = ({ slides }: ArrowSliderProps): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={s.slider}>
      <button className={s.arrow} onClick={prevSlide}>
        <MdKeyboardArrowLeft />
      </button>
      <div className={s.wrapper}>{slides[currentIndex]}</div>
      <button className={s.arrow} onClick={nextSlide}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  )
}
