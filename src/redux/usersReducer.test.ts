import {actions, InitialState, usersReducer} from './usersReducer'

let state: InitialState

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Bytka 0',
                status: 'status 0',
                followed: false,
                photos: {large: null, small: null},
            },
            {
                id: 1,
                name: 'Bytka 1',
                status: 'status 1',
                followed: false,
                photos: {large: null, small: null},
            },
            {
                id: 2,
                name: 'Bytka 2',
                status: 'status 2',
                followed: true,
                photos: {large: null, small: null},
            },
            {
                id: 3,
                name: 'Bytka 3',
                status: 'status 3',
                followed: true,
                photos: {large: null, small: null},
            },
        ],
        totalUsersCount: 0,
        currentPage: 1,
        pageSize: 5,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
})


test('follow success', () => {
    const newState = usersReducer(state, actions.subscribeSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unsubscribeSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})