import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import cl from './DialogItem.module.css'

interface IProps {
    id: number
    name: string
}

export const DialogItem: FC<IProps> = ({id, name}) => {
    const setActive = ({isActive}: { isActive: boolean }) => (isActive ? 'active-link' : '')
    const path = `/dialogs/${id}`

    return (
        <div className={cl.dialogItem}>
            <NavLink className={setActive} to={path}>
                {name}
            </NavLink>
        </div>
    )
}

