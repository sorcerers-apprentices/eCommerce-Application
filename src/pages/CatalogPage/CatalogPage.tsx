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
      <InputComponent value={''} title={''} type={'text'} placeholder={'Search'} />
      <Category />
    </>
  )
}

export default CatalogPage
