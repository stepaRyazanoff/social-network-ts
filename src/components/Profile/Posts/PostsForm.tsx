import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField} from "../../../helpers/createField"
import {maxLength, required} from "../../../utils/validators"
import {Textarea} from "../../common/FormsControls/FormsControls"
import {FC} from 'react'
import {PostsData} from "./Posts"

export type ArrayWithValidators = typeof validate
export type ValidatorRequiredType = typeof required
type PostsDataKey = keyof PostsData

const maxLength100 = maxLength(100)
const validate = [required, maxLength100]

const PostsForm: FC<InjectedFormProps<PostsData>> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<PostsDataKey>(
                'post',
                validate,
                undefined,
                Textarea,
                'Введите текст...',
                undefined,
                false,
                null,
                undefined)}
            <button>Add Post</button>
        </form>
    )
}

export default reduxForm<PostsData>({
    form: 'posts'
})(PostsForm)