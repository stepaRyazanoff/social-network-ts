import React, {FC} from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {required} from "../../utils/validators"
import {createField} from "../../helpers/createField"
import {Textarea} from "../common/FormsControls/FormsControls"
import {DialogsData} from "./Dialogs"

type DialogsDataKeys = keyof DialogsData

const DialogsForm: FC<InjectedFormProps<DialogsData>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<DialogsDataKeys>(
                'dialogs',
                required,
                undefined,
                Textarea,
                'Введите сообщение...',
                undefined,
                false,
                null,
                undefined)}
            <button>Send message</button>
        </form>
    )
}

export default reduxForm<DialogsData>({
    form: 'dialogs'
})(DialogsForm)