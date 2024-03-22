import axios from 'axios'
import {Items} from '../types/userApiTypes'
import {Auth} from '../types/authMeApiTypes'
import {Profile} from '../types/profileApiTypes'
import {UserPhoto} from '../types/userPhotoApiTypes'
import {CaptchaUrl} from '../types/captchaUrlApiTypes'
import {CommonAPIType, CommonData} from '../types/commonTypes'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '9947e954-4f4d-4295-a326-d1a6673e842c'
    },
})

type Nullable<T> = null | T

export enum ResultCodeEnum {
    success = 0,
    error = 1
}

export enum ResultCodeEnumCaptchaUrl {
    captchaUrl = 10
}

export const usersAPI = {
    getUsers: async (pageSize = 1, currentPage = 5,
                     term: string = '', friend: Nullable<boolean> = null) => {
        console.log(term)
        const response = await
            instance.get<Items>(`users?count=${pageSize}&page=${currentPage}&term=${term}` +
                (friend === null ? '' : `&friend=${friend}`))
        return response.data
    },

    setSubscribe: async (id: number) => {
        const response = await instance.post<CommonAPIType>(`follow/${id}`)
        return response.data
    },

    deleteSubscribe: async (id: number) => {
        const response = await instance.delete(`follow/${id}`)
        return response.data as Promise<CommonAPIType>
    }
}

export const authAPI = {
    authMe: async () => {
        const response = await instance.get<Auth>('auth/me')
        return response.data
    },

    getAuthPhoto: async (userId: number) => {
        const response = await instance.get<Profile>(`profile/${userId}`)
        return response.data.photos.small
    },

    login: async (email: Nullable<string>,
                  password: Nullable<string>,
                  rememberMe: boolean = false,
                  captcha: Nullable<string>) => {
        const response = await
            instance.post<CommonAPIType<CommonData, ResultCodeEnum | ResultCodeEnumCaptchaUrl>>('auth/login',
                {email, password, rememberMe, captcha})
        return response.data
    },

    logout: async () => {
        const response = await instance.delete('auth/login')
        return response.data as Promise<CommonAPIType>
    }
}

export const profileAPI = {
    getProfile: async (id: Nullable<number>) => {
        const response = await instance.get<Profile>(`profile/${id}`)
        return response.data
    },

    getUserStatus: async (userId: number) => {
        const response = await instance.get<string>(`profile/status/${userId}`)
        return response.data
    },

    updateUserStatus: async (newStatus: string) => {
        const response = await
            instance.put<CommonAPIType>('profile/status', {
                status: newStatus
            })
        return response.data
    },

    setUserPhoto: async (photoFile: File) => {
        const formData = new FormData()
        formData.append('image', photoFile)
        const response = await
            instance.put<UserPhoto>('profile/photo', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
        return response.data
    },

    setUpdatedProfile: async (profileData: Profile) => {
        const response = await instance.put<CommonAPIType>('profile',
            profileData)
        return response.data
    }
}


export const securityAPI = {
    getCaptcha: async () => {
        const response = await instance.get<CaptchaUrl>('security/get-captcha-url')
        return response.data
    }
}

