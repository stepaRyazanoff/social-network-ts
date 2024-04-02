import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {authMe} from "../../redux/authReducer"
import {compose} from "redux"

// import {withRedirect} from "../../hoc/withRedirect"

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header id={this.props.id}
                    login={this.props.login}
                    email={this.props.email}
                    isAuth={this.props.isAuth}
                    userPhoto={this.props.userPhoto}/>
        )
    }
}

const mapStateToProps = state => ({
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
    userPhoto: state.auth.userPhoto,
    isAuth: state.auth.isAuth,
})

export default compose(
    connect(
        mapStateToProps,
        null
    ))(HeaderContainer)