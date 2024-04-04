import React, {FC} from 'react'
import cl from './User.module.css'
import unknownPhoto from '../../../assets/img/unknown-photo.webp'
import {NavLink} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks'
import {IPhotos} from '../../../types/commonTypes'
import {subscribeToUser, unsubscribeFromUser} from '../../../redux/usersReducer'

interface IProps {
    photos: IPhotos
    name: string
    userId: number
    status: string
    followed: boolean
}

const User: FC<IProps> = ({photos: {small}, name, userId, status, followed,}) => {
    const dispatch = useAppDispatch()
    const followingInProgress = useAppSelector(state => state.usersPage.followingInProgress)

    const userSmallPhoto = small !== null ? small : unknownPhoto

    return (
        <div className={cl.userItem}>
            <span className={cl.numId}>{userId}</span>
            <div className={cl.userItemPhoto}>
                <NavLink to={`/profile/${userId}`}>
                    <img src={userSmallPhoto} alt=""/>
                </NavLink>
            </div>
            <div className={cl.itemAbout}>
                <div className={cl.itemName}>
                    <h5>{name}</h5>
                </div>
                <div className={cl.itemStatus}>{status}</div>
                {!followed &&
                    <button
                        disabled={followingInProgress.some(u => u === userId)}
                        onClick={() => dispatch(subscribeToUser(userId))}
                        className={cl.itemBtn}>
                        Подписаться
                    </button>}
                {followed &&
                    <button
                        disabled={followingInProgress.some(u => u === userId)}
                        onClick={() => dispatch(unsubscribeFromUser(userId))}
                        className={cl.itemBtn}>
                        Отписаться
                    </button>}
            </div>
        </div>
    )
}

export default User