import React, {FC} from 'react'
import cl from './Post.module.css'
import photoPost from '../../../../assets/img/photo-post.png'

interface IProps {
	message: string
	likes: number
}

export const Post: FC<IProps> = ({ message, likes }) => {
	return (
		<div className={cl.post}>
			<div className={cl.postItem}>
				<img src={photoPost} alt='' />
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

