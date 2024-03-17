import React, {FC} from "react"
import cl from './Login.module.css'
import LoginForm from "./LoginForm"
import {Nullable} from "../../redux/authReducer";

interface Props {
    logIn: (login: Nullable<string>,
            password: Nullable<string>,
            rememberMe: boolean,
            captcha: Nullable<string>) => void
    captcha: Nullable<string>
}

export interface LoginData {
    login: Nullable<string>
    password: Nullable<string>
    rememberMe: boolean
    captcha: Nullable<string>
}

const Login: FC<Props> = ({logIn, captcha}) => {
    const onSubmit = (loginData: LoginData) => {
        const {login, password, rememberMe, captcha} = loginData
        logIn(login, password, rememberMe, captcha)
    }

    return (
        <div className={cl.login}>
            <div className={cl.container}>
                <div className={cl.loginInner}>
                    <h4>Login</h4>
                    <LoginForm captcha={captcha} onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default Login