import type { ApiResponse } from '~/types/auth'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const baseURL = `${config.public.apiBaseUrl}${config.public.apiPrefix}`

  const apiFetch = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    if (authStore.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${authStore.token}`
    }

    const response = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
      ...options,
      headers
    })

    return response
  }

  return { apiFetch, baseURL }
}
