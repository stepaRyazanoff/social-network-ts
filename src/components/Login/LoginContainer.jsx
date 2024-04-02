import React from "react"
import {login} from "../../redux/authReducer"
import {connect} from "react-redux"
import Login from "./Login"
import {compose} from "redux"
import {Navigate} from "react-router"

class LoginContainer extends React.Component {

    logIn(login, password, rememberMe, captcha) {
        this.props.login(login, password, rememberMe, captcha)
    }

    render() {
        return (
            <>
                {this.props.isAuth && <Navigate to={'/profile'}/>}

                <Login logIn={this.logIn.bind(this)}
                       captcha={this.props.captcha}/>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
})

export default compose(connect
(mapStateToProps,
    {login}))
((LoginContainer))
