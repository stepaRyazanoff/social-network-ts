import {Field, WrappedFieldProps} from "redux-form"
import {Nullable} from "../redux/authReducer"
import cl from '../components/Login/LoginForm.module.css'
import {FC, ReactElement} from "react"
import {ArrayWithValidators, ValidatorRequiredType} from "../components/Profile/Posts/PostsForm"

export function createField<T extends string>
(name: T,
 validate: Nullable<ValidatorRequiredType> | ArrayWithValidators,
 fieldClassName: string | undefined,
 component: FC<WrappedFieldProps>,
 placeholder: string | undefined,
 type: string | undefined,
 isCheckbox: boolean,
 value: Nullable<string>,
 labelClassName: string | undefined): ReactElement {
    return (
        <>
            {isCheckbox
                ?
                <label className={labelClassName && cl[labelClassName]}>
                    <Field className={fieldClassName && cl[fieldClassName]}
                           name={name}
                           component={component}
                           placeholder={placeholder}
                           type={type}/>
                    <span>{value}</span>
                </label>
                :
                <Field className={fieldClassName && cl[fieldClassName]}
                       validate={validate}
                       name={name}
                       component={component}
                       placeholder={placeholder}
                       type={type}/>}
        </>
    )
}

