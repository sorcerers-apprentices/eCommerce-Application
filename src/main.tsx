import App from '@/app/App'
import '@/styles/style.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from '@/app/providers/ErrorBoundary/ErrorBoundary'

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
