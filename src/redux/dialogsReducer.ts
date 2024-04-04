import {ActionReturnType} from '../types/commonTypes'

type Actions = ActionReturnType<typeof actions>

interface IDialogs {
    id: number
    name: string
}

interface IMessages {
    id: number
    message: string
}

interface IInitialState {
    dialogs: IDialogs[]
    messages: IMessages[]
}

const initialState: IInitialState = {
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
    (state = initialState, action: Actions): IInitialState => {
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
    sendMessage: (messageText: string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', messageText} as const)
}



