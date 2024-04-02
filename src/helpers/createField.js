import {Field} from "redux-form"
import cl from '../components/Login/LoginForm.module.css'

export const createField =
    (name,
     validate,
     fieldClassName,
     component,
     placeholder,
     type,
     isCheckbox,
     value,
     labelClassName) => {
        return (
            <>
                {isCheckbox
                    ?
                    <label className={cl[labelClassName]}>
                        <Field className={cl[fieldClassName]}
                               name={name}
                               component={component}
                               placeholder={placeholder}
                               type={type}/>
                        <span>{value}</span>
                    </label>
                    :
                    <Field className={cl[fieldClassName]}
                           validate={validate}
                           name={name}
                           component={component}
                           placeholder={placeholder}
                           type={type}/>}
            </>
        )
    }

