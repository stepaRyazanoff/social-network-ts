import React, {FC} from "react"
import cl from './Message.module.css'

interface Props {
    message: string
    number: number
}


const Message: FC<Props> = ({message, number}) => {

    return (
        <div className={cl.messageItem}>
            {number}. {message}
        </div>
    )
}

export default Message