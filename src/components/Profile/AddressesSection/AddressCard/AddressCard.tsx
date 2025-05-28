import { useState, type ChangeEvent, type ReactElement } from 'react'
import type { TCustomerProfileForm } from '@/types/user-types'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

type TProperties = {
  userData: TCustomerProfileForm<string>
  setUserData: (value: (previous: TCustomerProfileForm<string>) => TCustomerProfileForm<string>) => void
  errors?: TCustomerProfileForm<string>
  disabled: boolean
}

export const AddressCard = ({ userData, setUserData, disabled }: TProperties): ReactElement => {
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
  const handleDefaultAddress = (
    checked: boolean,
    type: 'defaultShipping' | 'defaultBilling',
    addressId: string
  ): void => {
    setUserData((previous) => ({
      ...previous,
      [type]: checked ? addressId : '',
    }))
  }

  return (
    <>
      <div>
        <div>
          <fieldset>
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
              onChange={(event) => handleDefaultAddress(event.target.checked, 'defaultShipping', userData.shippingID)}
              disabled={disabled}
              checked={userData.defaultShipping !== ''}
              id="defaultShipping"
            />
          </fieldset>
          <fieldset>
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
              onChange={(event) => handleDefaultAddress(event.target.checked, 'defaultBilling', userData.billingID)}
              disabled={disabled}
              checked={userData.defaultBilling !== ''}
              id="defaultBilling"
            />
          </fieldset>
        </div>
      </div>
    </>
  )
}
