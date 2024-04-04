import React from 'react'
import cl from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import {logout} from '../../redux/authReducer'
import {useAppDispatch} from '../../hooks/hooks'

export const Navbar = () => {
    const setActive = ({isActive}: { isActive: boolean }) => (isActive ? 'active-link' : '')

    const dispatch = useAppDispatch()
    const handleClick = () => dispatch(logout())

    return (
        <aside className={cl.sidebar}>
            <nav className={cl.menu}>
                <ul>
                    <li>
                        <NavLink to="/profile" className={setActive}>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dialogs" className={setActive}>
                            Dialogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" className={setActive}>
                            Users
                        </NavLink>
                    </li>
                    <li className={cl.logout} onClick={handleClick}>
                        <NavLink to="/login" className={setActive}>
                            LogOut
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

