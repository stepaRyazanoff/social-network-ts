export interface Photos {
    small: string | null
    large: string | null
}

export interface ContactsType {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type CommonAPIType<T, R> = {
    resultCode: R
    messages: string[]
    data: T
}

export interface CommonData {
    userId: number
}