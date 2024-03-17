import {authMe} from "./authReducer"
import {ThunkDispatch} from "redux-thunk"
import {ActionsReturnType, RootState} from "./redux-store"

type ActionsType = ActionsReturnType<typeof actions>

interface InitialState {
    initialized: boolean
}

const initialState: InitialState = {
    initialized: false
}

export const appReducer =
    (state = initialState, action: ActionsType): InitialState => {
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

export const getInitialize = () => (dispatch: ThunkDispatch<RootState, unknown, ActionsType>) => {
    dispatch(authMe())
        .then(() => dispatch(actions.setInitialize()))
}