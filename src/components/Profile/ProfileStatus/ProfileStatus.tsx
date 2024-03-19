import React, {ChangeEvent, FC, useEffect, useState} from "react"
import cl from './ProfileStatus.module.css'

interface Props {
    userStatus: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<Props> = ({userStatus, updateStatus}) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(userStatus)
    useEffect(() => setStatus(userStatus), [userStatus])

    const onDoubleClicked = () => setEditMode(true)
    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.target.value)
    const sendStatus = () => {
        setEditMode(false)
        updateStatus(status)
    }

    return (
        <div className={cl.status}>
            <span className={cl.statusSpan}>
                <b>Status:</b>
            </span>
            <div className={cl.statusInner}>
                {!editMode && <span onDoubleClick={onDoubleClicked}>{userStatus || 'status'}</span>}
                {editMode && <input autoFocus onBlur={sendStatus} onChange={onTextChange} value={status}/>}
            </div>
        </div>
    )
}

export default ProfileStatus