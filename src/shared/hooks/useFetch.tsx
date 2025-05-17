import { useEffect, useState } from 'react'

type FetchParameters<T> = {
  enabled?: boolean
  defaultValue?: T
}

export const useFetch = <T,>(
  fetcher: () => Promise<T | Error>,
  parameters?: FetchParameters<T>
): {
  data: T | null
  error: Error | null
  loading: boolean
} => {
  const { enabled = true, defaultValue = null } = parameters || {}

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
        } else {
          setData(response)
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [fetcher, enabled])

  return {
    data,
    error,
    loading,
  }
}
