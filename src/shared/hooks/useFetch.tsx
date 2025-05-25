import { useEffect, useState } from 'react'

type FetchParameters<T> = {
  enabled?: boolean
  defaultValue?: T
  onSuccess?: (data: T) => void
  onFailure?: (error: Error) => void
}

export const useFetch = <T,>(
  fetcher: () => Promise<T | Error>,
  parameters?: FetchParameters<T>
): {
  data: T | null
  error: Error | null
  loading: boolean
} => {
  const { enabled = true, defaultValue = null, onSuccess, onFailure } = parameters || {}

  const [data, setData] = useState<null | T>(defaultValue)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    fetcher()
      .then((response) => {
        if (response instanceof Error) {
          setError(response)
          onFailure?.(response)
        } else {
          setData(response)
          onSuccess?.(response)
        }
      })
      .catch((error) => {
        setError(error)
        onFailure?.(error)
      })
      .finally(() => setLoading(false))
  }, [fetcher, parameters])

  return {
    data,
    error,
    loading,
  }
}
