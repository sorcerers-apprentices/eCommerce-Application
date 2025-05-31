import { useState, type ReactElement } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './Slider.scss' // Assuming you have a CSS file for styles, adjust the path as necessary

export const Slider = (): ReactElement => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderReference, instanceReference] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className="slider">
      <div className="navigation-wrapper">
        <div ref={sliderReference} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <img src="/images/dog-brown-bg.jpg" alt="dog" />
          </div>
          <div className="keen-slider__slide number-slide2">
            <img src="/images/dog-green-bg.jpg" alt="dog" />
          </div>
          <div className="keen-slider__slide number-slide3">
            <img src="/images/cat-yellow-bg.jpeg" alt="cat" />
          </div>
        </div>
        {loaded && instanceReference.current && (
          <>
            <Arrow
              left
              onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                event.stopPropagation()
                instanceReference.current?.prev()
              }}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                event.stopPropagation()
                instanceReference.current?.next()
              }}
              disabled={currentSlide === instanceReference.current.track.details.slides.length - 1}
            />
          </>
        )}
      </div>
      {loaded && instanceReference.current && (
        <div className="dots">
          {[...Array(instanceReference.current.track.details.slides.length).keys()].map((index) => {
            return (
              <button
                key={index}
                onClick={(event) => {
                  event.preventDefault()
                  instanceReference.current?.moveToIdx(index)
                }}
                className={'dot' + (currentSlide === index ? ' active' : '')}
              ></button>
            )
          })}
        </div>
      )}
    </div>
  )
}
type ArrowProperties = {
  left?: boolean
  onClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
  disabled?: boolean
}

function Arrow(properties: ArrowProperties): React.JSX.Element {
  const disabled = properties.disabled ? ' arrow-disabled' : ''
  return (
    <svg
      onClick={properties.onClick}
      className={`arrow ${properties.left ? 'arrow-left' : 'arrow-right'} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {properties.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!properties.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  )
}
