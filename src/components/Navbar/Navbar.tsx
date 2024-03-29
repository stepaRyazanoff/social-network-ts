import React, {FC} from 'react'
import cl from './Navbar.module.css'
import {NavLink} from 'react-router-dom'

interface Props {
    logOut: () => void
}

interface IsActive {
    isActive: boolean
}

const Navbar: FC<Props> = ({logOut}) => {
    const setActive = ({isActive}: IsActive) => (isActive ? 'active-link' : '')

    const onClicked = () => logOut()

    return (
        <aside className={cl.sidebar}>
            <nav className={cl.menu}>
                <ul>
                    <li>
                        <NavLink to='/profile' className={setActive}>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dialogs' className={setActive}>
                            Dialogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/users' className={setActive}>
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <a>News</a>
                    </li>
                    <li>
                        <a>Music</a>
                    </li>
                    <li>
                        <a>Settings</a>
                    </li>
                    <li className={cl.logout} onClick={onClicked}>
                        <a>LogOut</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Navbar
