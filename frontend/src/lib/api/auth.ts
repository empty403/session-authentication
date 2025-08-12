import { api } from '../api'

export type LoginRequest = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type AuthResponse = {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    isEmailVerified: boolean
    createdAt: string
  }
  message: string
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  validateResetToken: async (token: string): Promise<{ valid: boolean, message?: string }> => {
    const response = await api.get(`/auth/validate-reset-token/${token}`)
    return response.data
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/reset-password', { token, password })
    return response.data
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/verify-email', { token })
    return response.data
  },

  resendVerification: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/resend-verification')
    return response.data
  },

  googleAuth: async (credential: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/google', { credential })
    return response.data
  },
}