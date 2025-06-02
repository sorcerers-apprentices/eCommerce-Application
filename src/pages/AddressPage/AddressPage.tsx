import { Header } from '@/components/Header/Header'
import { type FormEvent, type ReactElement, useState } from 'react'
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

type ModalState = {
  state?: 'editAddress' | 'addShippingAddress' | 'addBillingAddress'
  address?: {
    id?: string
    country?: string
    city?: string
    streetName?: string
    postalCode?: string
  }
}

const AddressPage = (): ReactElement => {
  const [modal, setModal] = useState<ModalState>({})
  const modalName = {
    editAddress: 'New Address',
    addShippingAddress: 'Shipping address',
    addBillingAddress: 'Billing address',
  }

  const { data: meData, error: meError, refetch: refetchMe } = useFetch(api.user.fetchMe)

  const createAddressSection = (address: Address): ReactElement => {
    return (
      <div className={s.addresscontainer}>
        <div className={s.buttoncontainer}>
          <button onClick={() => setModal(() => ({ state: 'editAddress', address: { ...address } }))}>edit</button>
          <button onClick={() => deleteAddress(address)}>delete</button>
        </div>
        <div className={s.buttonscontainer}>
          <div className={s.buttoncontainer}>
            <button
              className={`${s.button} ${isBilling(address) ? s.active : s.inactive}`}
              onClick={() => updateBillingFlag(address)}
            >
              billing address
            </button>
            <button
              className={`${s.button} ${isShipping(address) ? s.active : s.inactive}`}
              onClick={() => updateShippingFlag(address)}
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
              onClick={() => updateDefaultBillingFlag(address)}
            >
              default billing
            </button>
            <button
              className={`${s.button} ${isDefaultShipping(address) ? s.active : s.inactive}`}
              onClick={() => updateDefaultShippingFlag(address)}
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
    const formData = new FormData(event.currentTarget)
    await api.user.updateMe([
      {
        action: 'changeAddress',
        addressId: modal.address?.id,
        address: {
          country: assertString(formData.get('country')),
          city: assertString(formData.get('city')),
          postalCode: assertString(formData.get('postalCode')),
          streetName: assertString(formData.get('streetName')),
        },
      },
    ])
    refetchMe()
    closeModal()
  }

  const closeModal = (): void => setModal(() => ({}))

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
                  value={modal.address?.streetName}
                  onChange={(event) => {
                    setModal((previous: ModalState): ModalState => {
                      return { ...previous, address: { ...previous.address, streetName: event.target.value } }
                    })
                  }}
                  title={'Address'}
                  type={'text'}
                  placeholder={'221B Baker Street'}
                />
                <InputComponent
                  name={'city'}
                  value={modal.address?.city}
                  onChange={(event) => {
                    setModal((previous: ModalState): ModalState => {
                      return { ...previous, address: { ...previous.address, city: event.target.value } }
                    })
                  }}
                  title={'City'}
                  type={'text'}
                  placeholder={'London'}
                />
              </div>
              <div>
                <SelectInput
                  name={'country'}
                  value={modal.address?.country}
                  onChange={(event) => {
                    setModal((previous: ModalState): ModalState => {
                      return { ...previous, address: { ...previous.address, country: event.target.value } }
                    })
                  }}
                  title={'Country'}
                  options2={[
                    { text: 'United Kingdom', value: 'GB' },
                    { text: 'Poland', value: 'PL' },
                    { text: 'Spain', value: 'ES' },
                  ]}
                />
                <InputComponent
                  name={'postalCode'}
                  value={modal.address?.postalCode}
                  onChange={(event) => {
                    setModal((previous: ModalState): ModalState => {
                      return { ...previous, address: { ...previous.address, postalCode: event.target.value } }
                    })
                  }}
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
              <FormButton value={'Save address'} disabled={false} />
            </Form>
          </Modal>
        </div>
      )}
    </>
  )
}

export default AddressPage
