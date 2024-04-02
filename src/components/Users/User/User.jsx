import React from "react"
import cl from './User.module.css'
import unknownPhoto from '../../../assets/img/unknown-photo.webp'
import {NavLink} from "react-router-dom";


const User = ({
                  name,
                  photos: {small},
                  userId,
                  status,
                  followed,
                  followingInProgress,
                  subscribe,
                  unsubscribe,
              }) => {

    const onButtonClickSubscribe = (id) => {
        subscribe(id)
    }

    const onButtonClickUnsubscribe = (id) => {
        unsubscribe(id)
    }

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
                {!followed && <button
                    disabled={followingInProgress.some(u => u === userId)}
                    onClick={() => {
                        onButtonClickSubscribe(userId)
                    }}
                    className={cl.itemBtn}>
                    Подписаться
                </button>}
                {followed && <button
                    disabled={followingInProgress.some(u => u === userId)}
                    onClick={() => {
                        onButtonClickUnsubscribe(userId)
                    }}
                    className={cl.itemBtn}>
                    Отписаться
                </button>}
            </div>
        </div>
    )
}

export default User