import React, {FC} from "react"
import {NavLink} from "react-router-dom"
import cl from './DialogItem.module.css'

interface Props {
    id: number
    name: string
}

interface IsActive {
    isActive: boolean
}

const DialogItem: FC<Props> = ({id, name}) => {
    const setActive = ({isActive}: IsActive) => (isActive ? 'active-link' : '')
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