import {ResultCodeEnum} from "../api/api";

type Nullable<T> = null | T

export interface Photos {
    small: Nullable<string>
    large: Nullable<string>
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

export type CommonAPIType<D = {}, R = ResultCodeEnum> = {
    resultCode: R
    messages: string[]
    data: D
}

export interface CommonData {
    userId: number
}