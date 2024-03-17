import React, {FC} from 'react'
import cl from './Post.module.css'
import photoPost from '../../../../assets/img/photo-post.png'

interface Props {
    message: string
    likes: number
}

const Post: FC<Props> = ({message, likes}) => {
    return (
        <div className={cl.post}>
            <div className={cl.postItem}>
                <img src={photoPost} alt=''/>
                <div className={cl.postBox}>
                    <div className={cl.message}>{message}</div>
                    <div className={cl.likes}>
                        like
                        <span> {likes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
