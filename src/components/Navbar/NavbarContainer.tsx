import React, {ComponentType} from 'react'
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {logout} from '../../redux/authReducer'
import {compose} from 'redux'
import {RootState} from '../../redux/redux-store'

interface DispatchProps {
    logout: () => void
}

class NavbarContainer extends React.Component<DispatchProps> {
    render() {
        const logOut = () => this.props.logout()

        return (
            <Navbar logOut={logOut}/>
        )
    }
}

export default compose<ComponentType>(
    connect<unknown, DispatchProps, unknown, RootState>(
        null,
        {logout}))
(NavbarContainer)