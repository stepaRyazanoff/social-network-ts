import cl from './FormsControls.module.css'
import cn from "classnames"
import {FC, ReactElement} from "react"
import {WrappedFieldProps} from "redux-form"

interface IElementsType {
    placeholder?: string
    className?: string
    type?: string
}

export const Textarea:
    FC<WrappedFieldProps & IElementsType> = ({
                                                 input,
                                                 placeholder,
                                                 meta: {error, submitFailed}
                                             }): ReactElement => {
    return (
        <div className={cn({[cl.error]: error && submitFailed})}>
            <textarea {...input} className={cl.textarea} placeholder={placeholder}/>
            {submitFailed && error && <span>{error}</span>}
        </div>
    )
}

export const Input:
    FC<WrappedFieldProps & IElementsType> = ({
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
                   className={className ? cn(cl.input, {[className]: className}) : ''}/>
            {submitFailed && error && <span>{error}</span>}
        </div>
    )
}