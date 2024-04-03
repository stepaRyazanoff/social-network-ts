import {authMe} from './authReducer'
import {ActionReturnType} from '../types/commonTypes'
import {AppDispatch} from './redux-store'

type Actions = ActionReturnType<typeof actions>

interface IInitialState {
    initialized: boolean
}

const initialState = {
    initialized: false
}

export const appReducer =
    (state = initialState, action: Actions): IInitialState => {
        switch (action.type) {
            case 'SN/APP/SET_INITIALIZE':
                return {
                    ...state,
                    initialized: true
                }

            default:
                return state
        }
    }

const actions = {
    setInitialize: () => ({
        type: 'SN/APP/SET_INITIALIZE'
    } as const)
}


export const getInitialize = () => (dispatch: AppDispatch) => {
    dispatch(authMe())
        .then(() => dispatch(actions.setInitialize))
}