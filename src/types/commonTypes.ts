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
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: IContacts
    photos: IPhotos
}

export interface IUser {
    id: number
    name: string
    status: string
    photos: IPhotos
    followed: boolean
}