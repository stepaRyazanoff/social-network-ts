import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField} from '../../../helpers/createField'
import {maxLength, required} from '../../../utils/validators'
import {Textarea} from '../../common/FormsControls/FormsControls'
import {IPostsData} from './Posts'

const maxLength100 = maxLength(100)

const PostsForm: FC<InjectedFormProps<IPostsData>> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<keyof IPostsData>(
                'posts',
                [required, maxLength100],
                null,
                Textarea,
                'Введите текст...',
                null,
                false,
                undefined,
                null)}
            <button>Add Post</button>
        </form>
    )
}

export default reduxForm<IPostsData>({
    form: 'posts'
})(PostsForm)