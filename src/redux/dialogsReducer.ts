import {ActionsReturnType} from "./redux-store"

type ActionsType = ActionsReturnType<typeof actions>

export interface DialogsType {
    id: number
    name: string
}

export interface Messages {
    id: number
    message: string
}

interface InitialState {
    dialogs: DialogsType[]
    messages: Messages[]
}

const initialState: InitialState = {
    dialogs: [
        {id: 1, name: 'one'},
        {id: 2, name: 'two'},
        {id: 3, name: 'three'},
        {id: 4, name: 'four'},
    ],
    messages: [
        {id: 1, message: 'Hello'},
        {id: 4, message: 'Good bye'},
    ],
}

export const dialogsReducer =
    (state = initialState, action: ActionsType): InitialState => {
        switch (action.type) {
            case 'SN/DIALOGS/SEND_MESSAGE':
                return {
                    ...state,
                    messages: [
                        ...state.messages, {
                            id: Date.now(),
                            message: action.messageText
                        }],
                }

            default:
                return state
        }
    }

export const actions = {
    sendMessage: (messageText: string) => ({
        type: 'SN/DIALOGS/SEND_MESSAGE', messageText
    } as const)
}



