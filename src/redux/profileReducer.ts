import {profileAPI} from '../api/api'
import {stopSubmit} from 'redux-form'
import {ActionReturnType, IPhotos, IProfile, Nullable} from '../types/commonTypes'
import {AppDispatch, RootState} from './redux-store'

type Actions = ActionReturnType<typeof actions>

interface IPosts {
    id: number
    message: string
    likesCount: number
}

interface IInitialState {
    posts: IPosts[]
    profile: Nullable<IProfile>
    status: string
    editMode: boolean
}

const initialState: IInitialState = {
    posts: [
        {id: 1, message: 'Hello everyone)!', likesCount: 12},
        {id: 2, message: 'I`m a little dumb!', likesCount: 4},
    ],
    profile: null,
    status: '',
    editMode: false,
}

export const profileReducer = (state = initialState, action: Actions): IInitialState => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, {
                    id: Date.now(),
                    message: action.postText,
                    likesCount: Math.ceil(Math.random() * 100)
                }],
            }

        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }

        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'SN/PROFILE/SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }

        case 'SN/PROFILE/SET_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {
                    ...state.profile as IProfile,
                    photos: action.photo as IPhotos
                }
            }

        case 'SN/PROFILE/SET_EDIT_MODE':
            return {
                ...state,
                editMode: action.isFetching
            }

        default:
    }
    return state
}

export const actions = {
    addPost: (postText: string) => ({type: 'SN/PROFILE/ADD_POST', postText} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    setPhotoSuccess: (photo: IPhotos) => ({type: 'SN/PROFILE/SET_PHOTO_SUCCESS', photo} as const),
    setProfile: (profile: IProfile) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'SN/PROFILE/SET_USER_STATUS', status} as const),
    switchEditMode: (isFetching: boolean) => ({type: 'SN/PROFILE/SET_EDIT_MODE', isFetching} as const)
}

export const setUserProfile = (profileId: Nullable<number>) => (dispatch: AppDispatch) => {
    profileAPI.getProfile(profileId)
        .then(data => {
            dispatch(actions.setProfile(data))
        })
}

export const getUserStatus = (userId: Nullable<number>) => (dispatch: AppDispatch) => {
    profileAPI.getUserStatus(userId)
        .then(status => {
            dispatch(actions.setUserStatus(status))
        })
}

export const setEditMode = (isFetching: boolean) => (dispatch: AppDispatch) => {
    dispatch(actions.switchEditMode(isFetching))
}

export const updateUserStatus = (newStatus: string) => (dispatch: AppDispatch) => {
    profileAPI.updateUserStatus(newStatus)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(actions.setUserStatus(newStatus))
            }
        })
}

export const setPhoto = (photoFile: File) => (dispatch: AppDispatch) => {
    profileAPI.setUserPhoto(photoFile)
        .then(data => {
            if (data.resultCode === 0)
                dispatch(actions.setPhotoSuccess(data.data.photos))
        })
}

export const setUpdatedUserProfile = (profileData: any) => (dispatch: AppDispatch, getState: () => RootState) => {
    profileAPI.setUpdatedProfile(profileData)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserProfile(getState().auth.id))
                dispatch(actions.switchEditMode(false))
            } else {
                if (data.messages.length > 0 && data.messages[0][0] === 'T') {
                    dispatch(stopSubmit('profileData', {
                        _error: data.messages[0]
                    }))
                } else if (data.messages.length > 0 && data.messages[0][0] === 'I') {
                    const stringOfError = data.messages[0]
                        .slice(data.messages[0]
                            .indexOf('>') + 1, data.messages[0]
                            .indexOf(')')).toLowerCase()
                    if (stringOfError === 'mainlink') {
                        const pieceOfString = stringOfError.slice(0, 4)
                        const updatedStringOfError = pieceOfString + 'Link'
                        dispatch(stopSubmit('profileData', {
                            'contacts': {
                                [updatedStringOfError]: data.messages[0]
                            }
                        }))
                    } else if (stringOfError !== 'mainlink') {
                        dispatch(stopSubmit('profileData', {
                            'contacts': {
                                [stringOfError]: data.messages[0]
                            }
                        }))
                    }
                } else {
                    dispatch(stopSubmit('profileData', {
                        _error: 'Some error!!!'
                    }))
                }
            }
        })
}


