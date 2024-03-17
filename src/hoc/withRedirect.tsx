import {Navigate} from "react-router"
import React from "react"
import {connect} from "react-redux"
import {ComponentType} from 'react'
import {RootState} from "../redux/redux-store"

interface StateProps {
    isAuth: boolean
}

const mapStateToProps = (state: RootState): StateProps => ({
    isAuth: state.auth.isAuth
})

export function withRedirect<T>(Component: ComponentType<T>) {
    function ComponentWithRedirect(props: T & StateProps) {
        if (!props.isAuth) return <Navigate to={'/login'}/>
        return <Component {...props}/>
    }

    return connect<StateProps, unknown, unknown, RootState>
    (mapStateToProps)(ComponentWithRedirect as ComponentType)
}












