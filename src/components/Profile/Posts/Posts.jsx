import React from 'react'
import Post from './Post/Post'
import cl from './Posts.module.css'
import PostsForm from "./PostsForm"

const Posts = ({posts, addPost}) => {
    const postsElements = posts
        .map(p => (<Post id={p.id}
                         key={p.id}
                         message={p.message}
                         likes={p.likesCount}/>))

    const onButtonClick = (postText) => {
        addPost(postText)
    }

    const onSubmit = (postsData) => {
        onButtonClick(postsData.posts)
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
