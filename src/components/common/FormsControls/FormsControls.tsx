import cl from './FormsControls.module.css'
import cn from 'classnames'
import {FC, ReactElement} from 'react'
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field'

export interface IPropsTextarea {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder: string
}

export const Textarea: FC<IPropsTextarea> = ({
                                                 input,
                                                 placeholder,
                                                 meta: {error, submitFailed}
                                             }): ReactElement => {
    return (
        <div className={cn({[cl.error]: error && submitFailed})}>
            <textarea {...input}
                      className={cl.textarea}
                      placeholder={placeholder}/>
            {submitFailed && error && <span>{error}</span>}
        </div>
    )
}

export interface IPropsInput extends IPropsTextarea {
    className: string
    type: string
}

export const Input: FC<IPropsInput> = ({
                                           className,
                                           type,
                                           input,
                                           placeholder,
                                           meta: {error, submitFailed}
                                       }): ReactElement => {

    return (
        <div className={cn({[cl.error]: submitFailed && error})}>
            <input {...input}
                   type={type}
                   placeholder={placeholder}
                   className={cn(cl.input, {[className]: className})}/>
            {submitFailed && error && <span>{error}</span>}
        </div>
    )
}