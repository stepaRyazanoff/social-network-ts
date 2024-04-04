import React, {useEffect, useState} from 'react'
import cl from './ProfileStatus.module.css'
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks'
import {updateUserStatus} from '../../../redux/profileReducer'

export const ProfileStatus = () => {
    const dispatch = useAppDispatch()
    const userStatus = useAppSelector(state => state.profilePage.status)
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(userStatus)

    useEffect(() => {
        setStatus(userStatus)
    }, [userStatus])

    const sendStatus = () => {
        setEditMode(false)
        dispatch(updateUserStatus(status))
    }

    return (
        <div className={cl.status}>
            <span className={cl.statusSpan}>
                <b>Status:</b>
            </span>
            <div className={cl.statusInner}>
                {!editMode
                    && <span onDoubleClick={() => setEditMode(true)}>
                        {userStatus || 'status'}</span>}
                {editMode
                    && <input autoFocus
                              onBlur={sendStatus}
                              onChange={e => setStatus(e.target.value)}
                              value={status}/>}
            </div>
        </div>
    )
}

