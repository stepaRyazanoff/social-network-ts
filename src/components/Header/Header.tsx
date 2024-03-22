import React, {FC} from 'react'
import cl from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {Nullable} from '../../redux/authReducer'

interface Props {
    userPhoto: Nullable<string>
    email: Nullable<string>
    isAuth: boolean
}

const Header: FC<Props> = ({userPhoto, email, isAuth}) => {
    const headerPhoto = !userPhoto ? '' : userPhoto

    return (
        <header className={cl.header}>
            <div className={cl.headerInner}>
                <div className={cl.headerLogo}>
                    <a href="/#">socialNetwork</a>
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
