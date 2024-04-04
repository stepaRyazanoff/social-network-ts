import React, {FC} from 'react'
import cn from 'classnames'
import {InjectedFormProps, reduxForm} from 'redux-form'
import cl from './LoginForm.module.css'
import {Input} from '../common/FormsControls/FormsControls'
import {createField} from '../../helpers/createField'
import {required} from '../../utils/validators'
import {Nullable} from '../../types/commonTypes'
import {ILoginData} from './Login'

interface IProps {
    captcha: Nullable<string>
}

const LoginForm: FC<InjectedFormProps<ILoginData, IProps> & IProps> =
    ({handleSubmit, captcha, error}) => {

        return (
            <form onSubmit={handleSubmit} className={cn(cl.loginForm, {[cl.summaryError]: error})}>
                {createField<keyof ILoginData>(
                    'login',
                    required,
                    'loginInput',
                    Input,
                    'login',
                    'text',
                    false,
                    undefined,
                    null)}
                {createField<keyof ILoginData>(
                    'password',
                    required,
                    'loginInput',
                    Input,
                    'password',
                    'password',
                    false,
                    undefined,
                    null)}
                {error
                    ? <span className={cl.errorText}>{error}</span>
                    : ''}
                {createField<keyof ILoginData>(
                    'rememberMe',
                    required,
                    null,
                    Input,
                    null,
                    'checkbox',
                    true,
                    'remember me',
                    'checkbox')}
                <button className={cl.loginBtn}>Login</button>
                {captcha &&
                    <div className={cl.captcha}>
                        <img src={captcha} alt="captcha"/>
                        {createField<keyof ILoginData>(
                            'captcha',
                            required,
                            null,
                            Input,
                            'Введите символы с картинки',
                            'text',
                            false,
                            undefined,
                            null)}
                    </div>}
            </form>
        )
    }

export default reduxForm<ILoginData, IProps>({
    form: 'login'
})(LoginForm)