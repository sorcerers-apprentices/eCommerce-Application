import { type ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
import { Category } from '@/components/Category/Category.tsx'

const CatalogPage = (): ReactElement => {
  return (
    <>
      <div>
        <Header />
      </div>
      <InputComponent isPassword={false} type={'text'} placeholder={'Search'} title={''} />
      <Category />
    </>
  )
}

export default CatalogPage
