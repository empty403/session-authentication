import { api } from '../api'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  displayName?: string
  bio?: string
  website?: string
  phoneNumber?: string
  dateOfBirth?: string
  country?: string
  city?: string
  profilePicture?: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type UpdateProfileRequest = {
  firstName?: string
  lastName?: string
  displayName?: string
  bio?: string
  website?: string
  phoneNumber?: string
  dateOfBirth?: string
  country?: string
  city?: string
}

export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
  logoutOtherSessions?: boolean
}

export type SessionInfo = {
  id: string
  deviceType: string
  browser: string
  os: string
  ipAddress: string
  location: string
  isCurrent: boolean
  createdAt: string
  lastActivityAt: string
}

export type LoginHistoryEntry = {
  id: string
  ipAddress: string
  location: string
  deviceType: string
  browser: string
  os: string
  success: boolean
  method: 'email' | 'google'
  createdAt: string
}

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile')
    return response.data
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await api.patch('/user/profile', data)
    return response.data
  },

  changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await api.post('/user/change-password', data)
    return response.data
  },

  uploadProfilePicture: async (file: File): Promise<{ profilePicture: string }> => {
    const formData = new FormData()
    formData.append('profilePicture', file)
    
    const response = await api.post('/user/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  getSessions: async (): Promise<SessionInfo[]> => {
    const response = await api.get('/user/sessions')
    return response.data
  },

  terminateSession: async (sessionId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/user/sessions/${sessionId}`)
    return response.data
  },

  terminateAllSessions: async (): Promise<{ message: string }> => {
    const response = await api.delete('/user/sessions')
    return response.data
  },

  getLoginHistory: async (): Promise<LoginHistoryEntry[]> => {
    const response = await api.get('/user/login-history')
    return response.data
  },
}