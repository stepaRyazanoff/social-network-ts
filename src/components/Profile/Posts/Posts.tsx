import React, {FC} from 'react'
import cl from './Posts.module.css'
import PostsForm from './PostsForm'
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks'
import {actions} from '../../../redux/profileReducer'
import {Post} from './Post/Post'

export interface IPostsData {
    posts: string
}

export const Posts: FC = () => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.profilePage.posts)

    const postsElements = posts.map(p => (<Post key={p.id} message={p.message} likes={p.likesCount}/>))

    const onSubmit = (postsData: IPostsData) => {
        dispatch(actions.addPost(postsData.posts))
    }

    return (
        <div className={cl.posts}>
            <div className={cl.postsTop}>
                <h5>My Posts</h5>
                <div className={cl.postsBox}>
                    <PostsForm onSubmit={onSubmit}/>
                </div>
            </div>
            {postsElements}
        </div>
    )
}

