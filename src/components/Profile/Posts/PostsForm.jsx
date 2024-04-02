import React from "react"
import {reduxForm} from "redux-form"
import {createField} from "../../../helpers/createField"
import {maxLength, required} from "../../../utils/validators"
import {Textarea} from "../../common/FormsControls/FormsControls"

const maxLength100 = maxLength(100)

const PostsForm = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField(
                'posts',
                [required, maxLength100],
                null,
                Textarea,
                'Введите текст...')}
            <button>Add Post</button>
        </form>
    )
}

export default reduxForm({
    form: 'posts'
})(PostsForm)