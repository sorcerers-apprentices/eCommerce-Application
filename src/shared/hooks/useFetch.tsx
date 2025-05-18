import { useEffect, useState } from 'react'

type FetchParameters<T> = {
  enabled?: boolean
  defaultValue?: T
  onSuccess?: (data: T | null) => void
  onFailure?: (error: Error | null) => void
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
  const [called, setCalled] = useState<boolean>(false)

  useEffect(() => {
    if (!enabled || called) {
      return
    }
    setCalled(true)

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
        if (onFailure) onFailure(error)
      })
      .finally(() => setLoading(false))
  }, [fetcher, enabled])

  return {
    data,
    error,
    loading,
  }
}
