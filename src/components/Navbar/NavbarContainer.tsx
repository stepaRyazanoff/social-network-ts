import React, {Component, ComponentElement, ComponentType} from "react"
import Navbar from "./Navbar"
import {connect} from "react-redux"
import {logout} from "../../redux/authReducer"
import {withRedirect} from "../../hoc/withRedirect"
import {compose} from "redux"
import {RootState} from "../../redux/redux-store"

interface DispatchProps {
    logout: () => void
}

class NavbarContainer extends React.Component<DispatchProps> {
    render() {
        const logOut = () => {
            this.props.logout()
        }

        return (
            <Navbar logOut={logOut}/>
        )
    }
}

export default compose<ComponentType>(
    withRedirect,
    connect<unknown, DispatchProps, unknown, RootState>(
        null,
        {logout}))
(NavbarContainer)