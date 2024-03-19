import React, {ComponentType} from "react"
import {login, Nullable} from "../../redux/authReducer"
import {connect} from "react-redux"
import Login from "./Login"
import {compose} from "redux"
import {Navigate} from "react-router"
import {RootState} from "../../redux/redux-store"

interface StateProps {
    isAuth: boolean
    captcha: Nullable<string>
}

interface DispatchProps {
    login: (login: Nullable<string>,
            password: Nullable<string>,
            rememberMe: boolean,
            captcha: Nullable<string>) => void
}

class LoginContainer extends React.Component<StateProps & DispatchProps> {

    logIn(login: Nullable<string>, password: Nullable<string>, rememberMe: boolean, captcha: Nullable<string>) {
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

const mapStateToProps = (state: RootState): StateProps => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
})

export default compose<ComponentType>(connect<StateProps, DispatchProps, unknown, RootState>
(mapStateToProps,
    {login}))
((LoginContainer))
