import '@/styles/style.scss'
import App from '@/app/App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from '@/app/providers/errorBoundary/errorBoundary'

const rootElement = document.createElement('div')
rootElement.id = 'root'
document.body.appendChild(rootElement)

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)
