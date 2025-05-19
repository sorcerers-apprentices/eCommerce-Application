import React, { type ReactNode } from 'react'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'

type ErrorBoundaryProperties = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProperties, ErrorBoundaryState> {
  constructor(properties: ErrorBoundaryProperties) {
    super(properties)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  public render(): ReactNode {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <ErrorPage />
    }

    return children
  }
}

export default ErrorBoundary
