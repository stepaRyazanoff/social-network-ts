import {usersAPI} from '../api/api'
import {updateUsersArray} from '../helpers/userReducerHelpers'
import {ActionReturnType, IUser} from '../types/commonTypes'
import {AppDispatch} from './redux-store'

type Actions = ActionReturnType<typeof actions>

interface IInitialState {
    users: IUser[]
    totalUsersCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    followingInProgress: number[]
}

const initialState: IInitialState = {
    users: [],
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 5,
    isFetching: false,
    followingInProgress: [],
}

export const usersReducer = (state = initialState, action: Actions): IInitialState => {
    switch (action.type) {
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }

        case 'SN/USERS/SET_TOTAL_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page
            }

        case 'SN/USERS/SUBSCRIBE':
            return {
                ...state,
                users:
                    updateUsersArray(
                        state.users,
                        action.userId,
                        'id',
                        {followed: true})
            }

        case 'SN/USERS/UNSUBSCRIBE':
            return {
                ...state,
                users:
                    updateUsersArray(
                        state.users,
                        action.userId,
                        'id',
                        {followed: false}
                    )
            }

        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }

        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.inProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state
    }
}

const actions = {
    setCurrentPage: (page: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', page} as const),
    setUsers: (users: IUser[]) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setTotalCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_COUNT', totalUsersCount} as const),
    subscribeSuccess: (userId: number) => ({type: 'SN/USERS/SUBSCRIBE', userId} as const),
    unsubscribeSuccess: (userId: number) => ({type: 'SN/USERS/UNSUBSCRIBE', userId} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (userId: number, inProgress: boolean) =>
        ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', userId, inProgress} as const)
}

export const getUsers = (pageSize: number, currentPage: number) => (dispatch: AppDispatch) => {
    dispatch(actions.toggleIsFetching(true))
    usersAPI.getUsers(pageSize, currentPage)
        .then(data => {
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalCount(data.totalCount))
            dispatch(actions.setCurrentPage(currentPage))
            dispatch(actions.toggleIsFetching(false))
        })
}

const subscriptionFlow = (dispatch: AppDispatch, userId: number, apiMethod: (userId: number) => Promise<any>, actionCreator: (userId: number) => Actions) => {
    dispatch(actions.toggleFollowingProgress(userId, true))
    apiMethod(userId)
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(actionCreator(userId))
                dispatch(actions.toggleFollowingProgress(userId, false))
            }
        })
}

export const subscribeToUser = (userId: number) => (dispatch: AppDispatch) => {
    subscriptionFlow(
        dispatch,
        userId,
        usersAPI.setSubscribe.bind(usersAPI),
        actions.subscribeSuccess)
}

export const unsubscribeFromUser = (userId: number) => (dispatch: AppDispatch) => {
    subscriptionFlow(
        dispatch,
        userId,
        usersAPI.deleteSubscribe.bind(usersAPI),
        actions.unsubscribeSuccess)
}


