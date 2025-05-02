import './App.scss'
import './index.scss'
import { type ReactElement } from 'react'
import AppRouter from '@/app/providers/router/AppRouter'

function App(): ReactElement {
  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
