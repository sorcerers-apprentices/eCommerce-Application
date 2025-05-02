import './App.scss'
import './index.scss'
import { Link } from 'react-router-dom'
import { type ReactElement } from 'react'
import AppRouter from '@/app/providers/router/AppRouter'

function App(): ReactElement {
  return (
    <div>
      <Link to={'/'}>Main</Link>
      <Link to={'/login'}>Login</Link>
      <AppRouter />
    </div>
  )
}

export default App
