import type { TAddressMapped } from '@/components/Profile/AddressMapper'
import s from './AddressCardForm.module.scss'
import { SelectInput } from '../SelectInput/SelectInput'
import { Checkbox } from '../Checkbox/Checkbox'
import { InputComponent } from '../InputComponent/InputComponent'
import { MdDeleteForever } from 'react-icons/md'
type TAddressCardFormProperties = {
  index: number
  addressData: TAddressMapped
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: string) => void
  onToggleDefault: (type: 'defaultShipping' | 'defaultBilling', id: string) => void
  onToggleFlag: (type: 'shipping' | 'billing', id: string) => void
  //onEdit: (id: string) => void
  onDelete: (id: string) => void
  disabled?: boolean
}

export const AddressCardForm: React.FC<TAddressCardFormProperties> = ({
  index,
  addressData,
  onChange,
  onToggleDefault,
  onToggleFlag,
  //onEdit,
  onDelete,
  disabled = false,
}) => {
  const { id, country, city, postalCode, street, defaultShipping, shipping, defaultBilling, billing } = addressData
  return (
    <fieldset className={s.fieldset}>
      <legend>Address {index + 1}</legend>
      <div className={s.content}>
        <div>
          <Checkbox
            title="Shipping address"
            checked={shipping}
            onChange={() => onToggleFlag('shipping', id)}
            id={`shipping-${id}`}
            disabled={disabled}
          />
          <Checkbox
            title="Billing address"
            checked={billing}
            onChange={() => onToggleFlag('billing', id)}
            id={`billing-${id}`}
            disabled={disabled}
          />
        </div>
        <SelectInput
          value={country}
          name="country"
          title="Country"
          options={['United Kingdom', 'Poland', 'Spain']}
          onChange={(e) => onChange(e, id)}
          disabled={disabled}
        />
        <InputComponent
          value={city}
          name="city"
          title="City"
          type="text"
          placeholder="London"
          allowWhitespaces={true}
          onChange={(e) => onChange(e, id)}
          disabled={disabled}
        />
        <InputComponent
          value={postalCode}
          name="postalCode"
          title="Postal Code"
          type="text"
          placeholder="221B"
          allowWhitespaces={true}
          onChange={(e) => onChange(e, id)}
          disabled={disabled}
        />
        <InputComponent
          value={street}
          name="street"
          title="Street"
          type="text"
          placeholder="Baker Street"
          allowWhitespaces={true}
          onChange={(e) => onChange(e, id)}
          disabled={disabled}
        />

        <div>
          <Checkbox
            title="Use as default shipping address"
            checked={defaultShipping}
            onChange={() => onToggleDefault('defaultShipping', id)}
            id={`defaultShipping-${id}`}
            disabled={disabled}
          />
          <Checkbox
            title="Use as default billing address"
            checked={defaultBilling}
            onChange={() => onToggleDefault('defaultBilling', id)}
            id={`defaultBilling-${id}`}
            disabled={disabled}
          />
        </div>
      </div>
      <div className={s.buttons}>
        {!disabled && (
          <button className="icon" onClick={() => onDelete(id)} disabled={disabled}>
            <MdDeleteForever className={s.icon} />
          </button>
        )}
      </div>
    </fieldset>
  )
}
