import React, {FC} from 'react'
import Post from './Post/Post'
import cl from './Posts.module.css'
import PostsForm from "./PostsForm"
import {IPosts} from "../../../redux/profileReducer"

interface Props {
    posts: IPosts[]
    addPost: (postText: string) => void
}

export interface PostsData {
    post: string
}

const Posts: FC<Props> = ({posts, addPost}) => {
    const postsElements = posts
        .map(p => (<Post key={p.id} message={p.message} likes={p.likesCount}/>))

    const onSubmit = (postsData: PostsData) => {
        addPost(postsData.post)
        console.log(postsData.post)
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

export default Posts
