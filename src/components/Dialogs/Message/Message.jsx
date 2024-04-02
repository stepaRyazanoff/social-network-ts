import React from "react"
import cl from './Message.module.css'


const Message = ({message, number}) => {

    return (
        <div className={cl.messageItem}>
            {number}. {message}
        </div>
    )
}

export default Message