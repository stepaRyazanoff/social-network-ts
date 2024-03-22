import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore
} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {profileReducer} from './profileReducer'
import {dialogsReducer} from './dialogsReducer'
import {usersReducer} from './usersReducer'
import {authReducer} from './authReducer'
import {thunk} from 'redux-thunk'
import {appReducer} from './appReducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type ActionsReturnType<T> = T extends { [key: string]: (...args: any[]) => infer R } ? R : never

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store