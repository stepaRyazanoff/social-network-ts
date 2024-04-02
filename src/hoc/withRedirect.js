import {Navigate} from "react-router"
import React from "react"
import {connect} from "react-redux";

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export const withRedirect = Component => {
    const ComponentWithRedirect = props => {
        if (!props.isAuth) return <Navigate to={'/login'}/>
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(ComponentWithRedirect)
}












