import React from "react"
import Navbar from "./Navbar"
import {connect} from "react-redux"
import {logout} from "../../redux/authReducer"
import {withRedirect} from "../../hoc/withRedirect"
import {compose} from "redux"

class NavbarContainer extends React.Component {
    render() {
        const logOut = () => {
            this.props.logout()
        }

        return (
            <Navbar logOut={logOut}/>
        )
    }
}

export default compose(
    withRedirect,
    connect(
        null,
        {logout}))
(NavbarContainer)