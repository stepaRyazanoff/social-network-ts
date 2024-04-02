import React from "react"
import cl from './Login.module.css'
import LoginForm from "./LoginForm"

const Login = ({logIn, captcha}) => {
    const onSubmit = (loginData) => {
        const {login, password, rememberMe, captcha} = loginData
        logIn(login, password, rememberMe, captcha)
    }

    return (
        <div className={cl.login}>
            <div className={cl.container}>
                <div className={cl.loginInner}>
                    <h4>Login</h4>
                    <LoginForm captcha={captcha}
                               onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default Login