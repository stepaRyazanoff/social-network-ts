import React, {FC} from 'react'
import cl from './Contacts.module.css'

interface IProps {
    contactTitle: string
    contactValue: string
}

export const Contacts: FC<IProps> = ({contactTitle, contactValue}) => {
    return (
        <div className={cl.contacts}>
            <b>{contactTitle}: </b>{contactValue}
        </div>
    )
}



