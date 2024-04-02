import React from 'react'
import cl from './Header.module.css'
import {NavLink} from "react-router-dom"

const Header = ({userPhoto, id, email, login, isAuth}) => {
    const headerPhoto = !userPhoto ? '' : userPhoto


    return (
        <header className={cl.header}>
            <div className={cl.headerInner}>
                <div className={cl.headerLogo}>
                    <a href='/#'>socialNetwork</a>
                </div>
                <div className={cl.loginBlock}>
                    {isAuth
                        ? <>
                            <div className={cl.email}>{email}</div>
                            {<img src={headerPhoto} alt=""/> || ''}
                        </>
                        : <NavLink to={'/login'}>Login</NavLink>}

                </div>
            </div>
        </header>
    )
}

export default Header
