import axios from 'axios'
import {
    CaptchaUrlAPI,
    CommonAPIType,
    IAuthMe,
    IItemsAPI,
    ILoginData,
    IPhotos,
    IProfileAPI,
    Nullable
} from '../types/commonTypes'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '9947e954-4f4d-4295-a326-d1a6673e842c'
    },
})

export const usersAPI = {
    getUsers: async (pageSize = 1, currentPage = 5) => {
        const response = await
            instance.get<IItemsAPI>(`users?count=${pageSize}&page=${currentPage}`)
        return response.data
    },

    setSubscribe: async (id: number) => {
        const response = await
            instance.post<CommonAPIType<{}>>(`follow/${id}`)
        return response.data
    },

    deleteSubscribe: async (id: number) => {
        const response = await
            instance.delete<CommonAPIType<{}>>(`follow/${id}`)
        return response.data
    }
}

export const authAPI = {
    authMe: async () => {
        const response = await
            instance.get<CommonAPIType<IAuthMe>>('auth/me')
        return response.data
    },

    getAuthPhoto: async (userId: number) => {
        const response = await
            instance.get<IProfileAPI>(`profile/${userId}`)
        return response.data.photos.small
    },

    login: async (email: string, password: string, rememberMe = false, captcha: string) => {
        const response = await
            instance.post<CommonAPIType<ILoginData>>('auth/login', {
                email,
                password,
                rememberMe,
                captcha
            })
        return response.data
    },

    logout: async () => {
        const response = await
            instance.delete<CommonAPIType<{}>>('auth/login')
        return response.data
    }
}

export const profileAPI = {
    getProfile: async (id: Nullable<number>) => {
        const response = await
            instance.get<IProfileAPI>(`profile/${id}`)
        return response.data
    },

    getUserStatus: async (userId: number) => {
        const response = await
            instance.get<string>(`profile/status/${userId}`)
        return response.data
    },

    updateUserStatus: async (newStatus: string) => {
        const response = await
            instance.put<CommonAPIType<{}>>('profile/status', {
                status: newStatus
            })
        return response.data
    },

    setUserPhoto: async (photoFile: File) => {
        const formData = new FormData()
        formData.append('image', photoFile)
        const response = await
            instance.put<CommonAPIType<IPhotos>>('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        return response.data
    },

    setUpdatedProfile: async (profileData: any) => {
        const response = await
            instance.put<CommonAPIType<{}>>('profile',
                profileData
            )
        return response.data
    }
}


export const securityAPI = {
    getCaptcha: async () => {
        const response = await
            instance.get<CaptchaUrlAPI>('security/get-captcha-url')
        return response.data
    }
}

