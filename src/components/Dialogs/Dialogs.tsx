import React, {FC} from 'react'
import cl from './Dialogs.module.css'
import DialogsForm from './DialogsForm'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {actions} from '../../redux/dialogsReducer'
import {DialogItem} from './DialogItem/DialogItem'
import {Message} from './Message/Message'

export interface IDialog {
    dialog: string
}

const Dialogs: FC = () => {
    const dispatch = useAppDispatch()
    const dialogs = useAppSelector(state => state.dialogsPage.dialogs)
    const messages = useAppSelector(state => state.dialogsPage.messages)

    const dialogsElements =
        dialogs.map(d => (<DialogItem key={d.id} name={d.name} id={d.id}/>))
    const messagesElements = messages
        .map((m, index) => (<Message key={m.id} number={index + 1} message={m.message}/>))

    const onSubmit = (dialogsData: IDialog) => {
        dispatch(actions.sendMessage(dialogsData.dialog))
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