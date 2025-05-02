import './App.scss'
import './index.scss'
import type { ReactElement } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { LoginPageAsync } from '@/pages/LoginPage/LoginPage.async'

function App(): ReactElement {
  return (
    <div>
      <Link to={'/'}>Main</Link>
      <Link to={'/login'}>Login</Link>
      <Routes>
        <Route path={'/'} element={<MainPageAsync />} />
        <Route path={'/login'} element={<LoginPageAsync />} />
      </Routes>
    </div>
  )
}

export default App
