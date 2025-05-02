import './App.scss'
import './index.scss'
import type { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage/MainPage'
import LoginPage from '@/pages/LoginPage/LoginPage'

function App(): ReactElement {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'/login'} element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
