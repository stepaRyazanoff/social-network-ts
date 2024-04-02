import React from "react"
import {reduxForm} from "redux-form"
import {required} from "../../utils/validators"
import {createField} from "../../helpers/createField"
import {Textarea} from "../common/FormsControls/FormsControls"

const DialogsForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField(
                'dialogs',
                required,
                null,
                Textarea,
                'Введите сообщение...')}
            <button>Send message</button>
        </form>
    )
}

export default reduxForm({
    form: 'dialogs'
})(DialogsForm)