// import type { FC } from 'react'
// import { SelectInput } from '@/shared/ui/SelectInput/SelectInput.tsx'
// import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
// //import { Checkbox } from '@/shared/ui/Checkbox/Checkbox.tsx'
// //import type { TFormFieldData } from '../types/formTypes'

// type TAddressFieldset = {
//   title: string
//   formData: {
//     country: string
//     city: string
//     postalCode: string
//     street: string
//   }
//   errors: Record<string, string>
//   serverErrors: Record<string, string>
//   handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
//   className?: string
// }

// export const AddressFieldset: FC<TAddressFieldset> = ({ title, formData, errors, serverErrors, handleChange, className }) => {
//   return (
//     <fieldset className={className}>
//       <legend>{title}</legend>

//       <SelectInput
//         value={formData.country.value}
//         name={'country'}
//         title={'Country'}
//         options={['United Kingdom', 'Poland', 'Spain']}
//         errors={errors.country || serverErrors.country}
//         onChange={handleChange}
//       />

//       <InputComponent
//         value={formData.city.value}
//         name={'city'}
//         title={'City'}
//         type={'text'}
//         placeholder={'London'}
//         allowWhitespaces={true}
//         errors={errors.city || serverErrors.city}
//         onChange={handleChange}
//       />

//       <InputComponent
//         value={formData.postalCode.value}
//         name={'postalCode'}
//         title={'Postal Code'}
//         type={'text'}
//         placeholder={'221B'}
//         allowWhitespaces={true}
//         errors={errors.postalCode || serverErrors.postalCode}
//         onChange={handleChange}
//       />
//       <InputComponent
//         value={formData.street.value}
//         name={'street'}
//         title={'Street'}
//         type={'text'}
//         placeholder={'Baker Street'}
//         allowWhitespaces={true}
//         errors={errors.street || serverErrors.street}
//         onChange={handleChange}
//       />
//     </fieldset>
//   )
// }
