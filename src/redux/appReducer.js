import {authMe} from "./authReducer"

const SET_INITIALIZE = 'socialNetwork/app/SET_INITIALIZE'

const initialState = {
    initialized: false
}

export const appReducer =
    (state = initialState, action) => {
        switch (action.type) {
            case SET_INITIALIZE:
                return {
                    ...state,
                    initialized: true
                }

            default:
                return state
        }
    }

const setInitialize = () => ({
    type: SET_INITIALIZE
})

export const getInitialize = () => dispatch => {
    dispatch(authMe())
        .then(() => dispatch(setInitialize()))
}