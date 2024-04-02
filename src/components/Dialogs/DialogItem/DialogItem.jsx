import React from "react"
import {NavLink} from "react-router-dom"
import cl from './DialogItem.module.css'

const DialogItem = ({id, name}) => {
    const setActive = ({isActive}) => (isActive ? 'active-link' : '')
    const path = `/dialogs/${id}`

    return (
        <div className={cl.dialogItem}>
            <NavLink className={setActive} to={path}>
                {name}
            </NavLink>
        </div>
    )
}

export default DialogItem