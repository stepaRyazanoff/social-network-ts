const SEND_MESSAGE = 'socialNetwork/dialogsPage/SEND_MESSAGE'

const initialState = {
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
    (state =
         initialState, action) => {
        switch (action.type) {
            case SEND_MESSAGE:
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

export const sendMessage = (messageText) => ({
    type: SEND_MESSAGE, messageText
})

