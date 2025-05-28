import { useEffect, useState, type ReactElement } from 'react'
import Loader from '@/shared/ui/Loader/Loader'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import s from './AddressesSection.module.scss'
import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import { AddressMapper, type TAddressMapped } from '../AddressMapper'
import { AddressCardForm } from '@/shared/ui/AddressCardForm/AddressCardForm'

export const AddressesSection = (): ReactElement => {
  const { data, error, loading } = useFetch<ClientResponse<Customer>>(api.user.fetchMe)

  const [userAddresses, setUserAddresses] = useState<TAddressMapped[]>([])
  useEffect(() => {
    if (data) {
      const addressView = AddressMapper.toAddressView(data.body)
      setUserAddresses(addressView)
    }
  }, [data])

  const handleEdit = (id: string): void => {
    console.log('Edit', id)
  }

  const handleDelete = (id: string): void => {
    setUserAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const handleToggleDefault = (field: 'defaultShipping' | 'defaultBilling', id: string): void => {
    setUserAddresses((prev) =>
      prev.map((addr) => {
        if (field === 'defaultShipping') {
          return { ...addr, defaultShipping: addr.id === id }
        }
        if (field === 'defaultBilling') {
          return { ...addr, defaultBilling: addr.id === id }
        }
        return addr
      })
    )
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
    <section className={s.section}>
      <div className={s.content}>
        <h2 className="title">Addresses</h2>
        {loading && <Loader />}
        {error && <div>{error.message}</div>}
        {data && userAddresses.length > 0 && (
          <div className={s.addressList}>
            {userAddresses.map((address) => (
              <AddressCardForm
                key={address.id}
                addressData={address}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleDefault={handleToggleDefault}
                onToggleFlag={handleToggleFlag}
                onChange={handleChange}
                disabled={false}
              />
            ))}
          </div>
        )}
      </div>
      <pre style={{ textAlign: 'left' }}>{JSON.stringify(userAddresses, REPLACER, SPACE)}</pre>
    </section>
  )
}
