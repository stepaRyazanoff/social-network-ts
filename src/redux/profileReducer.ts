import {profileAPI, ResultCodeEnum} from "../api/api"
import {stopSubmit} from "redux-form"
import {ActionsReturnType, AppDispatch, RootState} from "./redux-store"
import {ContactsType, Photos} from "../types/commonTypes"

type Nullable<T> = null | T
type ActionsType = ActionsReturnType<typeof actions>

export interface ProfileType {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: ContactsType
    photos: Photos
}

export interface IPosts {
    id: number
    message: string
    likesCount: number
}

interface InitialState {
    posts: IPosts[]
    profile: Nullable<ProfileType>
    status: string
    editMode: boolean
}

const initialState: InitialState = {
    posts: [
        {id: 1, message: 'Hello everyone)!', likesCount: 12},
        {id: 2, message: 'I`m a little dumb!', likesCount: 4},
    ],
    profile: null,
    status: '',
    editMode: false,
}

export const profileReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "SN/PROFILE/ADD_POST":
            return {
                ...state,
                posts: [...state.posts, {
                    id: Date.now(),
                    message: action.postText,
                    likesCount: Math.ceil(Math.random() * 100)
                }],
            }

        case "SN/PROFILE/DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }

        case "SN/PROFILE/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }

        case "SN/PROFILE/SET_USER_STATUS":
            return {
                ...state,
                status: action.status
            }

        case "SN/PROFILE/SET_PHOTO_SUCCESS":
            return {
                ...state,
                profile: {
                    ...state.profile as ProfileType,
                    photos: action.photos as Photos,
                }
            }

        case "SN/PROFILE/SET_EDIT_MODE":
            return {
                ...state,
                editMode: action.isFetching,
            }

        default:
            return state
    }
}

export const actions = {
    addPost: (postText: string) => ({type: 'SN/PROFILE/ADD_POST', postText} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    setPhotoSuccess: (photos: Photos) => ({type: 'SN/PROFILE/SET_PHOTO_SUCCESS', photos} as const),
    setProfile: (profile: Nullable<ProfileType>) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'SN/PROFILE/SET_USER_STATUS', status} as const),
    switchEditMode: (isFetching: boolean) => ({type: 'SN/PROFILE/SET_EDIT_MODE', isFetching} as const)
}

export const setUserProfile = (profileId: Nullable<number>) => (dispatch: AppDispatch) => {
    profileAPI.getProfile(profileId).then(data => {
        dispatch(actions.setProfile(data))
    })
}

export const getUserStatus = (userId: number) => (dispatch: AppDispatch) => {
    profileAPI.getUserStatus(userId).then(status => {
        dispatch(actions.setUserStatus(status))
    })
}

export const setEditMode = (isFetching: boolean) => (dispatch: AppDispatch) => {
    dispatch(actions.switchEditMode(isFetching))
}

export const updateUserStatus = (newStatus: string) => (dispatch: AppDispatch) => {
    profileAPI.updateUserStatus(newStatus).then(data => {
        if (data.resultCode === ResultCodeEnum.success) {
            dispatch(actions.setUserStatus(newStatus))
        }
    })
}

export const setPhoto = (photoFile: File) => (dispatch: AppDispatch) => {
    profileAPI.setUserPhoto(photoFile).then(data => {
        if (data.resultCode === ResultCodeEnum.success)
            dispatch(actions.setPhotoSuccess(data.data.photos))
    })
}

export const setUpdatedUserProfile = (profileData: ProfileType) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        profileAPI.setUpdatedProfile(profileData).then(data => {
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(setUserProfile(getState().auth.userId))
                dispatch(actions.switchEditMode(false))
            } else {
                if (data.messages.length > 0 && data.messages[0][0] === 'T') {
                    dispatch(stopSubmit('profileData', {_error: data.messages[0]}))
                } else if (data.messages.length > 0 && data.messages[0][0] === 'I') {
                    const stringOfError = data.messages[0]
                        .slice(data.messages[0].indexOf('>') + 1, data.messages[0].indexOf(')')).toLowerCase()
                    if (stringOfError === 'mainlink') {
                        const pieceOfString = stringOfError.slice(0, 4)
                        const updatedStringOfError = pieceOfString + 'Link'
                        dispatch(stopSubmit('profileData', {
                            'contacts': {[updatedStringOfError]: data.messages[0]}
                        }))
                    } else if (stringOfError !== 'mainlink') {
                        dispatch(stopSubmit('profileData', {
                            'contacts': {[stringOfError]: data.messages[0]}
                        }))
                    }
                } else {
                    dispatch(stopSubmit('profileData', {_error: 'Some error!!!'}))
                }
            }
        })
    }


