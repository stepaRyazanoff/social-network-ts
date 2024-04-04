import React, {FC} from 'react'
import cl from './Login.module.css'
import LoginForm from './LoginForm'
import {logIn} from '../../redux/authReducer'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {Navigate} from 'react-router'

export interface ILoginData {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const Login: FC = () => {
    const dispatch = useAppDispatch()
    const captcha = useAppSelector(state => state.auth.captcha)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const onSubmit = (loginData: ILoginData) => {
        const {login, password, rememberMe, captcha} = loginData
        dispatch(logIn(login, password, rememberMe, captcha))
    }

    return (
        <>
            {isAuth && <Navigate to="/profile"/>}
            <div className={cl.login}>
                <div className={cl.container}>
                    <div className={cl.loginInner}>
                        <h4>Login</h4>
                        <LoginForm captcha={captcha} onSubmit={onSubmit}/>
                    </div>
                </div>
            </div>
        </>
    )
}

