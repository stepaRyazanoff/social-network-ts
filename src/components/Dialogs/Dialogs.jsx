import React from 'react'
import cl from './Dialogs.module.css'
import Message from './Message/Message'
import DialogsForm from "./DialogsForm"
import DialogItem from './DialogItem/DialogItem'

const Dialogs = ({dialogs, messages, sendMessage}) => {

    const dialogsElements = dialogs
        .map(d => (<DialogItem key={d.id}
                               name={d.name}
                               id={d.id}/>))
    const messagesElements = messages
        .map((m, index) => (<Message key={m.id}
                                     number={index + 1}
                                     message={m.message}/>))

    const onSubmit = (dialogsData) => {
        sendMessage(dialogsData.dialogs)
    }

    return (
        <div className={cl.dialogs}>
            <div className={cl.inner}>
                <div className={cl.dialogsBox}>
                    {dialogsElements}
                </div>
                <div className={cl.messagesBox}>
                    {messagesElements}
                </div>
            </div>
            <div className={cl.formBox}>
                <DialogsForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Dialogs
