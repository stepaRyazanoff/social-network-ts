import {Photos} from "./commonTypes"
import {ResultCodeEnum} from "../api/api"

interface UserPhotosData {
    photos: Photos
}

export interface UserPhoto {
    data: UserPhotosData
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCodeEnum
}