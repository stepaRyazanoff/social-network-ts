import React, {FC} from 'react'
import cl from './Message.module.css'

interface IProps {
    number: number
    message: string
}

export const Message: FC<IProps> = ({message, number}) => {

    return (
        <div className={cl.messageItem}>
            {number}. {message}
        </div>
    )
}

