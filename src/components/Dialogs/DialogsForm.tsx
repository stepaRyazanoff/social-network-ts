import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {required} from '../../utils/validators'
import {createField} from '../../helpers/createField'
import {Textarea} from '../common/FormsControls/FormsControls'
import {IDialog} from './Dialogs'

const DialogsForm: FC<InjectedFormProps<IDialog>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<keyof IDialog>(
                'dialog',
                required,
                null,
                Textarea,
                'Введите сообщение...',
                null,
                false,
                undefined,
                null)}
            <button>Send message</button>
        </form>
    )
}

export default reduxForm<IDialog>({
    form: 'dialogs'
})(DialogsForm)