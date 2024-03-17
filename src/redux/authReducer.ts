import {authAPI, ResultCodeEnum, ResultCodeEnumCaptchaUrl, securityAPI} from "../api/api"
import {stopSubmit} from "redux-form"
import {ActionsReturnType, AppDispatch, RootState} from "./redux-store"
import {ThunkDispatch} from "redux-thunk"


type ActionsType = ActionsReturnType<typeof actions>
export type Nullable<T> = null | T

interface InitialState {
    userId: Nullable<number>
    login: Nullable<string>
    email: Nullable<string>
    userPhoto: Nullable<string>
    isAuth: boolean
    captcha: Nullable<string>
}

const initialState: InitialState = {
    userId: null,
    login: null,
    email: null,
    userPhoto: null,
    isAuth: false,
    captcha: null,
}

export const authReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "SN/AUTH/SET_AUTH_USER_DATA":
            return {
                ...state,
                ...action.data,
            }

        case "SN/AUTH/SET_CAPTCHA_URL":
            return {
                ...state,
                captcha: action.captcha
            }

        case "SN/AUTH/SET_USER_PHOTO":
            return {
                ...state,
                userPhoto: action.photo
            }

        default:
            return state
    }
}

const actions = {
    setAuthUserData: (userId: Nullable<number>, login: Nullable<string>, email: Nullable<string>, isAuth: boolean) =>
        ({
            type: 'SN/AUTH/SET_AUTH_USER_DATA', data: {userId, login, email, isAuth}
        } as const),
    setAuthUserPhoto: (photo: Nullable<string>) => ({type: 'SN/AUTH/SET_USER_PHOTO', photo} as const),
    setCaptchaUrl: (captcha: Nullable<string>) => ({type: 'SN/AUTH/SET_CAPTCHA_URL', captcha} as const)
}


export const authMe = () => async (dispatch: ThunkDispatch<RootState, unknown, ActionsType>) => {
    const authData = await authAPI.authMe();
    if (authData.resultCode === ResultCodeEnum.success) {
        authAPI.getAuthPhoto(authData.data.id)
            .then((photo) => {
                const {id, login, email} = authData.data;
                dispatch(actions.setAuthUserPhoto(photo));
                dispatch(actions.setAuthUserData(id, login, email, true));
            });
    }
}

export const login =
    (email: Nullable<string>, password: Nullable<string>, rememberMe: boolean, captcha: Nullable<string>) =>
        (dispatch: AppDispatch) => {
            authAPI.login(email, password, rememberMe, captcha)
                .then(data => {
                    if (data.resultCode === ResultCodeEnum.success) {
                        dispatch(authMe())
                    } else {
                        if (data.resultCode === ResultCodeEnumCaptchaUrl.captchaUrl) {
                            dispatch(getCaptchaUrl())
                        }
                        const errorText = data.messages.length > 0
                            ? data.messages[0]
                            : 'Some error!!!'
                        dispatch(stopSubmit('login', {_error: errorText}))
                    }
                })
        }

export const getCaptchaUrl = () => (dispatch: AppDispatch) => {
    securityAPI.getCaptcha()
        .then(data => dispatch(actions.setCaptchaUrl(data.url)))
}

export const logout = () => (dispatch: AppDispatch) => {
    authAPI.logout()
        .then((data) => {
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            }
        })
}








