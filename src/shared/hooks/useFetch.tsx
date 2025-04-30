import { useState } from 'react'

type FetchParameters = {
  enable: boolean
}

export const useFetch = <T,>(
  fetcher: () => Promise<T | Error>,
  parameters?: FetchParameters
): {
  data: T | null
  error: Error | null
  isLoading: boolean
} => {
  const [data, setData] = useState<null | T>(null)
  const [error, setError] = useState<null | Error>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [called, setCalled] = useState(false)

  const enable = parameters?.enable === undefined ? true : parameters?.enable

  if (!called && enable) {
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
      .finally(() => setIsLoading(false))
  }

  return {
    data,
    error,
    isLoading,
  }
}
