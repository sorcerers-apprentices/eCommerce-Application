import { Header } from '@/components/Header/Header'
import { type ChangeEvent, type FormEvent, type ReactElement, useState } from 'react'
import { useFetch } from '@/shared/hooks/useFetch.tsx'
import { api } from '@/server/api.ts'
import type { Address } from '@commercetools/platform-sdk'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
import { Form } from '@/shared/ui/Form/Form.tsx'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput.tsx'
import { Toggler } from '@/shared/ui/Toggler/Toggler.tsx'
import { Modal } from '@/shared/ui/Modal/Modal.tsx'
import { FormButton } from '@/components/LoginForm/FormButton.tsx'
import s from './AddressPage.module.scss'
import { useValidate } from '@/hooks/useValidate.tsx'
import {
  createRegexPostalCodeValidator,
  createSelectValidator,
  POSTAL_CODE_REGEX,
  validateCity,
  validateStreet,
} from '@/shared/utilities/validation.ts'
import { toast } from 'react-hot-toast'

type ModalState = {
  state?: 'editAddress' | 'addShippingAddress' | 'addBillingAddress'
  addressId?: string
}

type AddressFormData = {
  country: { value: string; touched: boolean }
  city: { value: string; touched: boolean }
  postalCode: { value: string; touched: boolean }
  streetName: { value: string; touched: boolean }
}

const AddressPage = (): ReactElement => {
  const [modal, setModal] = useState<ModalState>({})
  const modalName = {
    editAddress: 'New Address',
    addShippingAddress: 'Shipping address',
    addBillingAddress: 'Billing address',
  }

  const { data: meData, error: meError, refetch: refetchMe } = useFetch(api.user.fetchMe)

  const createEmptyFormData = (): AddressFormData => {
    return {
      country: { value: '', touched: false },
      city: { value: '', touched: false },
      postalCode: { value: '', touched: false },
      streetName: { value: '', touched: false },
    }
  }
  const [formData, setFormData] = useState<AddressFormData>(createEmptyFormData())

  const { errors, isValid, resetValidation } = useValidate(formData, {
    country: [createSelectValidator(['GB', 'PL', 'ES'])],
    city: [validateCity],
    postalCode: [
      createRegexPostalCodeValidator(
        {
          GB: POSTAL_CODE_REGEX.GB,
          ES: POSTAL_CODE_REGEX.ES,
          PL: POSTAL_CODE_REGEX.PL,
        },
        () => formData.country.value
      ),
    ],
    streetName: [validateStreet],
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: { value, touched: true } }))
  }

  const createAddressSection = (address: Address): ReactElement => {
    return (
      <div className={s.addresscontainer}>
        <div className={s.buttoncontainer}>
          <button
            onClick={() => {
              setModal(() => ({ state: 'editAddress', addressId: address.id }))
              setFormData({
                country: {
                  value: address.country,
                  touched: false,
                },
                city: {
                  value: address.city ?? '',
                  touched: false,
                },
                streetName: {
                  value: address.streetName ?? '',
                  touched: false,
                },
                postalCode: {
                  value: address.postalCode ?? '',
                  touched: false,
                },
              })
            }}
          >
            edit
          </button>
          <button onClick={() => deleteAddress(address)}>delete</button>
        </div>
        <div className={s.buttonscontainer}>
          <div className={s.buttoncontainer}>
            <button
              className={`${s.button} ${isBilling(address) ? s.active : s.inactive}`}
              onClick={() => {
                updateBillingFlag(address)
                toast.success('Billing address is update')
              }}
            >
              billing address
            </button>
            <button
              className={`${s.button} ${isShipping(address) ? s.active : s.inactive}`}
              onClick={() => {
                updateShippingFlag(address)
                toast.success('Shipping address is update')
              }}
            >
              shipping address
            </button>
          </div>
        </div>
        <div className={s.infocontainer}>
          <span>
            Country: <span>{toCountryName(address.country)}</span>
          </span>
          <span>
            City: <span>{address.city}</span>
          </span>
          <span>
            Street: <span>{address.streetName}</span>
          </span>
          <span>
            Postal code: <span>{address.postalCode}</span>
          </span>
        </div>
        <div className={s.buttonscontainer}>
          <div className={s.buttoncontainer}>
            <button
              className={`${s.button} ${isDefaultBilling(address) ? s.active : s.inactive}`}
              onClick={() => {
                updateDefaultBillingFlag(address)
                toast.success('Default Billing address is update')
              }}
            >
              default billing
            </button>
            <button
              className={`${s.button} ${isDefaultShipping(address) ? s.active : s.inactive}`}
              onClick={() => {
                updateDefaultShippingFlag(address)
                toast.success('Default Shipping address is update')
              }}
            >
              default shipping
            </button>
          </div>
        </div>
      </div>
    )
  }

  const toCountryName = (countryCode: string): string => {
    switch (countryCode) {
      case 'GB':
        return 'United Kingdom'
      case 'PL':
        return 'Poland'
      case 'ES':
        return 'Spain'
      default:
        return countryCode
    }
  }

  const isDefaultShipping = (address: Address): boolean => {
    return meData?.body.defaultShippingAddressId === address.id
  }

  const isDefaultBilling = (address: Address): boolean => {
    return meData?.body.defaultBillingAddressId === address.id
  }

  const isShipping = (address: Address): boolean => {
    return meData?.body.shippingAddressIds?.includes(address.id ?? '') ?? false
  }

  const isBilling = (address: Address): boolean => {
    return meData?.body.billingAddressIds?.includes(address.id ?? '') ?? false
  }

  const updateDefaultBillingFlag = async (address: Address): Promise<void> => {
    await api.user.updateMe([
      {
        action: 'setDefaultBillingAddress',
        addressId: meData?.body.defaultBillingAddressId === address.id ? undefined : address.id,
      },
    ])
    refetchMe()
  }

  const updateDefaultShippingFlag = async (address: Address): Promise<void> => {
    await api.user.updateMe([
      {
        action: 'setDefaultShippingAddress',
        addressId: meData?.body.defaultShippingAddressId === address.id ? undefined : address.id,
      },
    ])
    refetchMe()
  }

  const updateBillingFlag = async (address: Address): Promise<void> => {
    await api.user.updateMe([
      {
        action: meData?.body.billingAddressIds?.includes(address.id ?? '')
          ? 'removeBillingAddressId'
          : 'addBillingAddressId',
        addressId: address.id,
      },
    ])
    refetchMe()
  }

  const updateShippingFlag = async (address: Address): Promise<void> => {
    await api.user.updateMe([
      {
        action: meData?.body.shippingAddressIds?.includes(address.id ?? '')
          ? 'removeShippingAddressId'
          : 'addShippingAddressId',
        addressId: address.id,
      },
    ])
    refetchMe()
  }

  const deleteAddress = async (address: Address): Promise<void> => {
    await api.user.updateMe([
      {
        action: 'removeAddress',
        addressId: address.id,
      },
    ])
    refetchMe()
  }

  const assertString = (value: FormDataEntryValue | null): string => {
    if (typeof value === 'string') {
      return value
    }
    throw new Error(`Unsupported ${typeof value}`)
  }

  const addAddress = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const ids = meData?.body.addresses.map((address) => address.id)
    const customer = await api.user.updateMe([
      {
        action: 'addAddress',
        address: {
          country: assertString(formData.get('country')),
          city: assertString(formData.get('city')),
          postalCode: assertString(formData.get('postalCode')),
          streetName: assertString(formData.get('streetName')),
        },
      },
    ])
    const id = customer.body.addresses.map((address) => address.id).find((id) => !ids?.includes(id))
    await api.user.updateMe([
      {
        action: modal.state === 'addBillingAddress' ? 'addBillingAddressId' : 'addShippingAddressId',
        addressId: id,
      },
    ])
    if (formData.get('default')) {
      await api.user.updateMe([
        {
          action: modal.state === 'addBillingAddress' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress',
          addressId: id,
        },
      ])
    }
    refetchMe()
    closeModal()
  }

  const editAddress = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    await api.user.updateMe([
      {
        action: 'changeAddress',
        addressId: modal.addressId,
        address: {
          country: assertString(formData.country.value),
          city: assertString(formData.city.value),
          postalCode: assertString(formData.postalCode.value),
          streetName: assertString(formData.streetName.value),
        },
      },
    ])
    refetchMe()
    closeModal()
  }

  const closeModal = (): void => {
    setModal(() => ({}))
    setFormData(createEmptyFormData())
    resetValidation()
  }

  return (
    <>
      <Header />
      {meError && 'Ooops'}
      {meData && (
        <div className={`section`}>
          <div className={s.topbuttonscontainer}>
            <button onClick={() => setModal(() => ({ state: 'addBillingAddress' }))} className={s.button}>
              Add billing address
            </button>
            <button onClick={() => setModal(() => ({ state: 'addShippingAddress' }))} className={s.button}>
              Add shipping address
            </button>
          </div>
          <div className={s.container}>{meData.body.addresses.map((address) => createAddressSection(address))}</div>

          <Modal isOpen={!!modal.state} onClose={closeModal}>
            <Form className={[s.form]} onSubmit={modal.state === 'editAddress' ? editAddress : addAddress}>
              <div>{modal.state && modalName[modal.state]}</div>
              <div>
                <InputComponent
                  name={'streetName'}
                  value={formData.streetName.value}
                  onChange={handleChange}
                  title={'Address'}
                  type={'text'}
                  errors={errors.streetName}
                  placeholder={'221B Baker Street'}
                />
                <InputComponent
                  name={'city'}
                  value={formData.city.value}
                  onChange={handleChange}
                  title={'City'}
                  type={'text'}
                  errors={errors.city}
                  placeholder={'London'}
                />
              </div>
              <div>
                <SelectInput
                  name={'country'}
                  value={formData.country.value}
                  onChange={handleChange}
                  title={'Country'}
                  errors={errors.country}
                  options2={[
                    { text: 'United Kingdom', value: 'GB' },
                    { text: 'Poland', value: 'PL' },
                    { text: 'Spain', value: 'ES' },
                  ]}
                />
                <InputComponent
                  name={'postalCode'}
                  value={formData.postalCode.value}
                  onChange={handleChange}
                  errors={errors.postalCode}
                  title={'Postal code'}
                  type={'text'}
                  placeholder={'221B'}
                />
              </div>
              {modal.state !== 'editAddress' && (
                <div>
                  <Toggler name={'default'} label={'Use as default'} />
                </div>
              )}
              <button onClick={closeModal} className={(s.cancel, s.button)}>
                Cancel
              </button>
              <FormButton value={'Save address'} disabled={!isValid} />
            </Form>
          </Modal>
        </div>
      )}
    </>
  )
}

export default AddressPage
