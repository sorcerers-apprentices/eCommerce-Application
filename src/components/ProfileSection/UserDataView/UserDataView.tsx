import { useState, type ChangeEvent, type ReactElement } from 'react'
import type { TCustomerProfileForm } from '@/types/user-types'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './UserDataView.scss' // Assuming you have a CSS file for styles, adjust the path as necessary
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

//import s from './UserDataView.module.scss'

type TProperties = {
  userData: TCustomerProfileForm<string>
  setUserData: (value: (previous: TCustomerProfileForm<string>) => TCustomerProfileForm<string>) => void
  errors?: TCustomerProfileForm<string>
  disabled: boolean
}

export const UserDataView = ({ userData, setUserData, disabled }: TProperties): ReactElement => {
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
  const [sameAddress, setSameAddress] = useState(false)
  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target
    setUserData((previous) => ({
      ...previous,
      [name]: value,
    }))
    setSameAddress(false)
  }

  const handleSameAddress = (checked: boolean): void => {
    setSameAddress(checked)
    if (checked) {
      setUserData((previous) => ({
        ...previous,
        billingCountry: previous.shippingCountry,
        billingCity: previous.shippingCity,
        billingPostalCode: previous.shippingPostalCode,
        billingStreet: previous.shippingStreet,
      }))
    }
  }
  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderReference} className="keen-slider">
          <fieldset className="keen-slider__slide number-slide1">
            <legend>Personal Information</legend>
            <InputComponent
              name="email"
              value={userData.email}
              type="email"
              title="Email"
              errors={null}
              disabled={disabled}
              onChange={handleChange}
              placeholder="user@example.com"
            />
            <InputComponent
              name="firstName"
              value={userData.firstName}
              type="text"
              title="First Name"
              errors={null}
              disabled={disabled}
              onChange={handleChange}
              placeholder="John"
            />
            <InputComponent
              name="lastName"
              value={userData.lastName}
              type="text"
              title="Last Name"
              errors={null}
              disabled={disabled}
              onChange={handleChange}
              placeholder="Doe"
            />
            <InputComponent
              name="dateOfBirth"
              value={userData.dateOfBirth}
              title="Day of birthday"
              type="date"
              errors={null}
              disabled={disabled}
              onChange={handleChange}
              placeholder="1990-01-01"
            />
          </fieldset>
          <fieldset className="keen-slider__slide number-slide2">
            <legend>Shipping Address</legend>
            <SelectInput
              value={userData.shippingCountry}
              name={'shippingCountry'}
              title={'Country'}
              options={['United Kingdom', 'Poland', 'Spain']}
              //errors={errors.shippingCountry || serverErrors.shippingCountry}
              onChange={handleChange}
              disabled={disabled}
            />
            <InputComponent
              value={userData.shippingCity}
              name={'shippingCity'}
              title={'City'}
              type={'text'}
              placeholder={'London'}
              allowWhitespaces={true}
              //errors={errors.shippingCity || serverErrors.shippingCity}
              onChange={handleChange}
              disabled={disabled}
            />
            <InputComponent
              value={userData.shippingPostalCode}
              name={'shippingPostalCode'}
              title={'Postal Code'}
              type={'text'}
              placeholder={'221B'}
              allowWhitespaces={true}
              //errors={errors.shippingPostalCode || serverErrors.shippingPostalCode}
              onChange={handleChange}
              disabled={disabled}
            />
            <InputComponent
              value={userData.shippingStreet}
              name={'shippingStreet'}
              title={'Street'}
              type={'text'}
              placeholder={'Baker Street'}
              allowWhitespaces={true}
              //errors={errors.shippingStreet || serverErrors.shippingStreet}
              onChange={handleChange}
              disabled={disabled}
            />
            <Checkbox
              title={'Use as default shippinging address'}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                console.log(event.target.checked)
              }}
              disabled={disabled}
              id="defaultShipping"
            />
          </fieldset>
          <fieldset className="keen-slider__slide number-slide3">
            <legend>Billing Address</legend>
            <Checkbox
              title={'Set shipping address as billing'}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const checked = event.target.checked
                setSameAddress(checked)
                handleSameAddress(checked)
              }}
              checked={sameAddress}
              disabled={disabled}
              id="sameAddress"
            />
            <SelectInput
              value={userData.billingCountry}
              name={'billingCountry'}
              title={'Country'}
              disabled={disabled || sameAddress}
              options={['United Kingdom', 'Poland', 'Spain']}
              //errors={errors.billingCountry || serverErrors.billingCountry}
              onChange={handleChange}
            />
            <InputComponent
              value={userData.billingCity}
              name={'billingCity'}
              title={'City'}
              type={'text'}
              disabled={disabled || sameAddress}
              placeholder={'London'}
              allowWhitespaces={true}
              //errors={errors.billingCity || serverErrors.billingCity}
              onChange={handleChange}
            />
            <InputComponent
              value={userData.billingPostalCode}
              name={'billingPostalCode'}
              title={'Postal Code'}
              type={'text'}
              disabled={disabled || sameAddress}
              placeholder={'221B'}
              allowWhitespaces={true}
              //errors={errors.billingPostalCode || serverErrors.billingPostalCode}
              onChange={handleChange}
            />
            <InputComponent
              value={userData.billingStreet}
              name={'billingStreet'}
              title={'Street'}
              type={'text'}
              disabled={disabled || sameAddress}
              placeholder={'Baker Street'}
              allowWhitespaces={true}
              //errors={errors.billingStreet || serverErrors.billingStreet}
              onChange={handleChange}
            />
            <Checkbox
              title={'Use as default billing address'}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                console.log(event.target.checked)
              }}
              disabled={disabled}
              id="defaultBilling"
            />
          </fieldset>
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
    </>
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
