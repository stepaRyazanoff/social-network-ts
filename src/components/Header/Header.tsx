import React from 'react'
import cl from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {useAppSelector} from '../../hooks/hooks'

export const Header = () => {
    const userPhoto = useAppSelector(state => state.auth.userPhoto)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const email = useAppSelector(state => state.auth.email)

    const headerPhoto = !userPhoto ? '' : userPhoto
    return (
        <header className={cl.header}>
            <div className={cl.headerInner}>
                <div className={cl.headerLogo}>
                    <a href="/#">socialNetwork</a>
                </div>
                <div className={cl.loginBlock}>
                    {isAuth
                        ?
                        <>
                            <div className={cl.email}>{email}</div>
                            {<img src={headerPhoto} alt=""/> || ''}
                        </>
                        : <NavLink to={'/logIn'}>Login</NavLink>}
                </div>
            </div>
        </header>
    )
}

