import cl from './FormsControls.module.css'
import cn from "classnames"

export const Textarea = ({input, placeholder, meta: {error, submitFailed}}) => {
    return (
        <div className={cn({[cl.error]: error && submitFailed})}>
            <textarea {...input}
                      className={cl.textarea}
                      placeholder={placeholder}/>
            {submitFailed && error && <span>{error}</span>}
        </div>
    )
}

export const Input = ({className, type, input, placeholder, meta: {error, submitFailed}}) => {
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