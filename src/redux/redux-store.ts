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

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = createStore(reducers, applyMiddleware(thunk))

export default store