import {ResultCodeSuccess} from '../api/api'

export type ActionReturnType<T> = T extends { [key: string]: (...args: any[]) => infer R } ? R : never
export type Nullable<T> = null | T

export interface IPhotos {
    small: Nullable<string>
    large: Nullable<string>
}

export interface IContacts {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export interface IProfile {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: IContacts
    photos: IPhotos
}

interface IDataPhotos {
    photos: IPhotos
}

export interface IUserPhoto {
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCodeSuccess
    data: IDataPhotos
}

export interface IUser {
    id: number
    name: string
    status: string
    photos: IPhotos
    followed: boolean
}

export interface IItemsAPI {
    items: IUser[]
    totalCount: number
    error: Nullable<string>
}

export type CommonAPIType<T, R> = {
    resultCode: R
    messages: string[]
    data: T
}

export interface IAuthMe {
    id: number
    email: string
    login: string
}

export interface ILoginAPI {
    userId: number
}

export interface CaptchaUrlAPI {
    url: string
}