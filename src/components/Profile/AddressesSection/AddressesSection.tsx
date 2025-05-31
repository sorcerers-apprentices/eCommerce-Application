import { useEffect, useState, type ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import s from './AddressesSection.module.scss'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import { AddressMapper, type TAddressMapped } from '../AddressMapper'
import { AddressCardForm } from '@/shared/ui/AddressCardForm/AddressCardForm'
import { BsHouseAddFill } from 'react-icons/bs'
import { TbHomeEdit } from 'react-icons/tb'
import { Form } from '@/shared/ui/Form/Form'
import { Button } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

export const AddressesSection = (): ReactElement => {
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const emptyAddress: TAddressMapped = {
    id: crypto.randomUUID(),
    country: '',
    city: '',
    street: '',
    postalCode: '',
    defaultShipping: false,
    defaultBilling: false,
    shipping: false,
    billing: false,
  }
  const { data, error, loading } = useFetch<ClientResponse<Customer>>(api.user.fetchMe)

  const [userAddresses, setUserAddresses] = useState<TAddressMapped[]>([])
  useEffect(() => {
    if (data) {
      const addressView = AddressMapper.toAddressView(data.body)
      setUserAddresses(addressView)
    }
  }, [data])

  const handleDelete = (id: string): void => {
    setUserAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const handleToggleDefault = (field: 'defaultShipping' | 'defaultBilling', id: string): void => {
    setUserAddresses((prev) => {
      const clickedAddress = prev.find((addr) => addr.id === id)
      const isCurrentlyChecked = clickedAddress?.[field] ?? false
      return prev.map((addr) => {
        if (addr.id === id) {
          return { ...addr, [field]: !isCurrentlyChecked }
        }
        return { ...addr, [field]: false }
      })
    })
  }
  const handleModalClose = (newAddress?: TAddressMapped): void => {
    if (newAddress) {
      setUserAddresses((prev) => [...prev, newAddress])
      //  handleSubmit()
    }
    setIsModalOpen(false)
  }

  const handleToggleFlag = (field: 'shipping' | 'billing', id: string): void => {
    setUserAddresses((prev) => prev.map((addr) => (addr.id === id ? { ...addr, [field]: !addr[field] } : addr)))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: string): void => {
    const { name, value } = e.target
    setUserAddresses((prev) => prev.map((addr) => (addr.id === id ? { ...addr, [name]: value } : addr)))
  }
  const REPLACER = null
  const SPACE = 2
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => handleModalClose()}>
        <AddressCardForm
          addressData={emptyAddress}
          index={1}
          onDelete={handleDelete}
          onToggleDefault={handleToggleDefault}
          onToggleFlag={handleToggleFlag}
          onChange={handleChange}
          disabled={false}
        />
      </Modal>
      <section className={s.section}>
        <div className={s.links}>
          {!isEditing && (
            <>
              <button className="icon" onClick={() => setIsEditing(true)}>
                <TbHomeEdit className={`icon ${s.edit}`} />
              </button>
              <button
                className="icon"
                onClick={() => {
                  setIsEditing(true)
                  setIsModalOpen(true)
                }}
              >
                <BsHouseAddFill className={`icon ${s.add}`} />
              </button>
            </>
          )}
        </div>
        <div className={s.content}>
          <h2 className="title">Addresses</h2>
          {loading && <Loader />}
          {error && <div>{error.message}</div>}
          {data && userAddresses.length > 0 && (
            <Form onSubmit={(e) => e.preventDefault()}>
              {userAddresses.map((address, index) => (
                <AddressCardForm
                  key={address.id}
                  index={index}
                  addressData={address}
                  onDelete={handleDelete}
                  onToggleDefault={handleToggleDefault}
                  onToggleFlag={handleToggleFlag}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              ))}
              {isEditing && (
                <div className={s.buttons}>
                  <Button type="submit">Save</Button>
                  <Button
                    type="reset"
                    onClick={() => {
                      setIsEditing(false)
                      setUserAddresses(AddressMapper.toAddressView(data.body))
                    }}
                  >
                    Cencel
                  </Button>
                </div>
              )}
            </Form>
          )}
          <pre style={{ textAlign: 'left' }}>{JSON.stringify(userAddresses, REPLACER, SPACE)}</pre>
        </div>
        <div className={s.image}></div>
      </section>
    </>
  )
}
