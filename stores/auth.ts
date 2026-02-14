import { defineStore } from 'pinia'
import type { User, LoginRequest, RegisterRequest, TokenResponse, ApiResponse } from '~/types/auth'

const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user_info'

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const baseURL = `${config.public.apiBaseUrl}${config.public.apiPrefix}`

  // State
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const user = ref<User | null>(null)

  // 客户端初始化
  if (import.meta.client) {
    token.value = localStorage.getItem(TOKEN_KEY)
    refreshToken.value = localStorage.getItem(REFRESH_TOKEN_KEY)
    const userStr = localStorage.getItem(USER_KEY)
    if (userStr) {
      try {
        user.value = JSON.parse(userStr)
      } catch {
        user.value = null
      }
    }
  }

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const username = computed(() => user.value?.username || '')

  // Actions
  async function login(loginData: LoginRequest): Promise<TokenResponse> {
    try {
      const response = await $fetch<ApiResponse<TokenResponse>>(`${baseURL}/auth/login`, {
        method: 'POST',
        body: loginData
      })

      if (response.code !== 200) {
        throw { code: response.code, message: response.message }
      }

      const data = response.data

      // 保存 Token 和用户信息
      token.value = data.access_token
      refreshToken.value = data.refresh_token
      user.value = data.user

      if (import.meta.client) {
        localStorage.setItem(TOKEN_KEY, data.access_token)
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
        localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      }

      return data
    } catch (error: any) {
      // 处理 $fetch 的 HTTP 错误和业务错误
      if (error?.data?.message) {
        throw { code: error.data.code || error.statusCode, message: error.data.message }
      } else if (error?.message) {
        throw { code: error.code || 500, message: error.message }
      }
      throw { code: 500, message: '网络错误，请稍后重试' }
    }
  }

  async function register(registerData: RegisterRequest): Promise<User> {
    try {
      const response = await $fetch<ApiResponse<User>>(`${baseURL}/auth/register`, {
        method: 'POST',
        body: registerData
      })

      if (response.code !== 200) {
        throw { code: response.code, message: response.message }
      }

      return response.data
    } catch (error: any) {
      // 处理 $fetch 的 HTTP 错误和业务错误
      if (error?.data?.message) {
        throw { code: error.data.code || error.statusCode, message: error.data.message }
      } else if (error?.message) {
        throw { code: error.code || 500, message: error.message }
      }
      throw { code: 500, message: '网络错误，请稍后重试' }
    }
  }

  async function logout(): Promise<void> {
    try {
      if (token.value) {
        await $fetch(`${baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })
      }
    } catch {
      // 忽略登出错误
    } finally {
      clearAuth()
    }
  }

  function clearAuth(): void {
    token.value = null
    refreshToken.value = null
    user.value = null

    if (import.meta.client) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }

  async function fetchUserInfo(): Promise<User | null> {
    if (!token.value) return null

    try {
      const response = await $fetch<ApiResponse<User>>(`${baseURL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (response.code === 200) {
        user.value = response.data
        if (import.meta.client) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data))
        }
        return response.data
      }
      return null
    } catch {
      clearAuth()
      return null
    }
  }

  async function checkAuth(): Promise<boolean> {
    if (!token.value) return false

    try {
      await fetchUserInfo()
      return !!user.value
    } catch {
      clearAuth()
      return false
    }
  }

  return {
    token,
    refreshToken,
    user,
    isLoggedIn,
    isAdmin,
    username,
    login,
    register,
    logout,
    clearAuth,
    fetchUserInfo,
    checkAuth
  }
})
