import {usersAPI} from "../api/api"
import {updateUsersArray} from "../helpers/userReducerHelpers"

const SET_USERS = 'socialNetwork/usersPage/SET_USERS'
const SUBSCRIBE = 'socialNetwork/usersPage/SUBSCRIBE'
const UNSUBSCRIBE = 'socialNetwork/usersPage/UNSUBSCRIBE'
const SET_TOTAL_COUNT = 'socialNetwork/usersPage/SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'socialNetwork/usersPage/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'socialNetwork/usersPage/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'socialNetwork/usersPage/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [],
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 5,
    isFetching: false,
    followingInProgress: [],
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        case SUBSCRIBE:
            return {
                ...state,
                users:
                    updateUsersArray(
                        state.users,
                        action.userId,
                        'id',
                        {followed: true})
            }

        case UNSUBSCRIBE:
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

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

const setCurrentPage = page => ({type: SET_CURRENT_PAGE, page})
const setUsers = users => ({type: SET_USERS, users})
const setTotalCount = totalUsersCount => ({type: SET_TOTAL_COUNT, totalUsersCount})
const subscribeSuccess = userId => ({type: SUBSCRIBE, userId})
const unsubscribeSuccess = userId => ({type: UNSUBSCRIBE, userId})
const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching})
const toggleFollowingProgress = (userId, inProgress) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, userId, inProgress
})

export const getUsers = (pageSize, currentPage) => dispatch => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(pageSize, currentPage)
        .then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalCount(data.totalCount))
            dispatch(setCurrentPage(currentPage))
            dispatch(toggleIsFetching(false))
        })
}


const subscriptionFlow = (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(userId, true))
    apiMethod(userId)
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(actionCreator(userId))
                dispatch(toggleFollowingProgress(userId, false))
            }
        })
}

export const subscribeToUser = userId => dispatch => {
    subscriptionFlow(
        dispatch,
        userId,
        usersAPI.setSubscribe.bind(usersAPI),
        subscribeSuccess)
}

export const unsubscribeFromUser = userId => dispatch => {
    subscriptionFlow(
        dispatch,
        userId,
        usersAPI.deleteSubscribe.bind(usersAPI),
        unsubscribeSuccess)
}


