import {ContactsType, Photos} from "./commonTypes"

export interface Profile {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: ContactsType
    photos: Photos
}