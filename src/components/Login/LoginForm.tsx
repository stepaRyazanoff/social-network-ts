import React, {FC} from "react"
import cn from "classnames"
import {InjectedFormProps, reduxForm} from "redux-form"
import cl from "./LoginForm.module.css"
import {Input} from "../common/FormsControls/FormsControls"
import {createField} from "../../helpers/createField"
import {required} from "../../utils/validators"
import {Nullable} from "../../redux/authReducer"
import {LoginData} from "./Login"

interface Props {
    captcha: Nullable<string>
}

type LoginDataKeys = keyof LoginData

const LoginForm: FC<InjectedFormProps<LoginData, Props> & Props> =
    ({handleSubmit, error, captcha}) => {

        return (
            <form onSubmit={handleSubmit} className={cn(cl.loginForm, {[cl.summaryError]: error})}>
                {createField<LoginDataKeys>(
                    'login',
                    required,
                    'loginInput',
                    Input,
                    'login',
                    'text',
                    false,
                    null,
                    undefined)},
                {createField<LoginDataKeys>(
                    'password',
                    required,
                    'loginInput',
                    Input,
                    'password',
                    'password',
                    false,
                    null,
                    undefined)}
                {error ? <span className={cl.errorText}>{error}</span> : ''}
                {createField<LoginDataKeys>(
                    'rememberMe',
                    required,
                    undefined,
                    Input,
                    undefined,
                    'checkbox',
                    true,
                    'remember me',
                    'checkbox')}
                <button className={cl.loginBtn}>Login</button>
                {captcha &&
                    <div className={cl.captcha}>
                        <img src={captcha} alt='captcha'/>
                        {createField<LoginDataKeys>(
                            'captcha',
                            required,
                            undefined,
                            Input,
                            'Введите символы с картинки',
                            'text',
                            false,
                            null,
                            undefined)}
                    </div>}
            </form>
        )
    }

export default reduxForm<LoginData, Props>({
    form: 'login'
})(LoginForm)