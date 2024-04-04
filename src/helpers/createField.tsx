import {Field} from 'redux-form'
import cl from '../components/Login/LoginForm.module.css'
import {Nullable} from '../types/commonTypes'
import {FunctionComponent} from 'react'
import {IPropsInput, IPropsTextarea} from '../components/common/FormsControls/FormsControls'

export function createField<K extends string>
(name: K,
 validate:
     ((value: undefined | string) => string | undefined) |
     [(value: undefined | string) => 'Field is required!' |
         undefined, (value: undefined | string) => string | undefined] | undefined,
 fieldClassName: Nullable<string>,
 component: FunctionComponent<IPropsTextarea & IPropsInput>,
 placeholder: Nullable<string>,
 type: Nullable<string>,
 isCheckbox: boolean,
 value: string | undefined,
 labelClassName: Nullable<string>) {
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

