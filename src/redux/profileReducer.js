import {profileAPI} from "../api/api"
import {stopSubmit} from "redux-form"

const ADD_POST = 'socialNetwork/profilePage/ADD_POST'
const SET_USER_PROFILE = 'socialNetwork/profilePage/SET_USER_PROFILE'
const SET_USER_STATUS = 'socialNetwork/profilePage/SET_USER_STATUS'
const DELETE_POST = 'socialNetwork/profilePage/DELETE_POST'
const SET_PHOTO_SUCCESS = 'socialNetwork/profilePage/SET_PHOTO_SUCCESS'
const SET_EDIT_MODE = 'socialNetwork/profilePage/SET_EDIT_MODE'

const initialState = {
    posts: [
        {id: 1, message: 'Hello everyone)!', likesCount: 12},
        {id: 2, message: 'I`m a little dumb!', likesCount: 4},
    ],
    profile: null,
    status: '',
    editMode: false,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: Date.now(),
                    message: action.postText,
                    likesCount: Math.ceil(Math.random() * 100)
                }],
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }

        case SET_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photo
                }
            }

        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.isFetching
            }

        default:
            return state
    }
}

export const addPost = postText => ({type: ADD_POST, postText})
export const deletePost = postId => ({type: DELETE_POST, postId})
const setPhotoSuccess = photo => ({
    type: SET_PHOTO_SUCCESS, photo
})
export const setProfile = profile => ({
    type: SET_USER_PROFILE, profile
})

export const setUserProfile = profileId => dispatch => {
    profileAPI.getProfile(profileId)
        .then(data => {
            dispatch(setProfile(data))
        })
}

export const setUserStatus = status => ({
    type: SET_USER_STATUS, status
})

export const switchEditMode = isFetching => ({
    type: SET_EDIT_MODE, isFetching
})

export const getUserStatus = userId => dispatch => {
    profileAPI.getUserStatus(userId)
        .then(status => {
            dispatch(setUserStatus(status))
        })
}

export const setEditMode = isFetching => dispatch => {
    dispatch(switchEditMode(isFetching))
}

export const updateUserStatus = newStatus => dispatch => {
    profileAPI.updateUserStatus(newStatus)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserStatus(newStatus))
            }
        })
}

export const setPhoto = photoFile => dispatch => {
    profileAPI.setUserPhoto(photoFile)
        .then(data => {
            if (data.resultCode === 0)
                dispatch(setPhotoSuccess(data.data.photos))
        })
}

export const setUpdatedUserProfile = profileData => (dispatch, getState) => {
    profileAPI.setUpdatedProfile(profileData)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserProfile(getState().auth.userId))
                dispatch(switchEditMode(false))
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


