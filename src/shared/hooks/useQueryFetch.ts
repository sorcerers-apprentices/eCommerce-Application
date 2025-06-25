import { useQuery } from '@tanstack/react-query'

export type FetchParameters<T> = {
  queryKey: string[] | readonly unknown[]
  initialData?: T
  enabled?: boolean
}

export const useQueryFetch = <T>(
  queryFn: () => Promise<T>,
  { queryKey, initialData, enabled = true }: FetchParameters<T>
): {
  data?: T
  error: Error | null
  loading: boolean
} => {
  const { data, error, isLoading } = useQuery<T, Error>({
    queryKey,
    queryFn,
    enabled,
    initialData,
  })

  return {
    data: data,
    error: error,
    loading: isLoading,
  }
}
