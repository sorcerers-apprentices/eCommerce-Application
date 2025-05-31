import React, { useState, type ReactElement } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './Slider.scss' // Assuming you have a CSS file for styles, adjust the path as necessary

export type SliderImage = {
  url: string
  name: string | undefined
}

type SliderProperties = {
  images: Array<SliderImage>
}

export const Slider = ({ images }: SliderProperties): ReactElement => {
  const [sliderIndex, setSliderIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderReference, instanceReference] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setSliderIndex(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className="slider">
      <div className="navigation-wrapper">
        <div ref={sliderReference} className="keen-slider">
          {images.map((img, index) => (
            <div className={`keen-slider__slide number-slide${index + 1}`}>
              <img src={img.url} alt={img.name} />
            </div>
          ))}
        </div>
        {loaded && instanceReference.current && (
          <>
            <Arrow
              left
              onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                event.stopPropagation()
                instanceReference.current?.prev()
              }}
              disabled={sliderIndex === 0}
            />

            <Arrow
              onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                event.stopPropagation()
                instanceReference.current?.next()
              }}
              disabled={sliderIndex === instanceReference.current.track.details.slides.length - 1}
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
                className={'dot' + (sliderIndex === index ? ' active' : '')}
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
