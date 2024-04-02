import {addPost, deletePost, profileReducer} from "./profileReducer"

// test data
const state = {
    posts: [
        {id: 1, message: 'Hello everyone)!', likesCount: 12},
        {id: 2, message: 'I`m a little dumb!', likesCount: 4},
    ]
}

test('length of posts should be incremented', () => {
    // action
    const newState = profileReducer(state, addPost('Hello world!'))

    // expectation
    expect(newState.posts.length).toBe(3)
})

test('message in the post should be correct', () => {
    // action
    const newState = profileReducer(state, addPost('Hello world!'))

    // expectation
    expect(newState.posts[2].message).toBe('Hello world!')
})

test('after deletion, the length of posts should be decrease', () => {
    // action
    const newState = profileReducer(state, deletePost(1))

    // expectation
    expect(newState.posts.length).toBe(1)
})

test('if the id passed for deletion is incorrect, the length of posts should not decrease', () => {
    // action
    const newState = profileReducer(state, deletePost(10))

    // expectation
    expect(newState.posts.length).toBe(2)
})