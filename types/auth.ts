/** 用户注册请求 */
export interface RegisterRequest {
  username: string
  password: string
  email?: string
  real_name?: string
  school?: string
  major?: string
}

/** 用户登录请求 */
export interface LoginRequest {
  username: string
  password: string
  device_type?: 'web' | 'mobile' | 'desktop'
}

/** 修改密码请求 */
export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

/** 用户信息 */
export interface User {
  id: string
  username: string
  email: string | null
  real_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  status: 'active' | 'inactive' | 'banned'
  created_at: string
}

/** Token 响应 */
export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user: User
}

/** 统一 API 响应格式 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}
