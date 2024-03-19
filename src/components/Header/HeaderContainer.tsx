import React, {ComponentType} from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {RootState} from '../../redux/redux-store'
import {Nullable} from '../../redux/authReducer'

interface StateProps {
    id: Nullable<number>
    login: Nullable<string>
    email: Nullable<string>
    userPhoto: Nullable<string>
    isAuth: boolean
}

class HeaderContainer extends React.Component<StateProps> {

    render() {
        return (
            <Header email={this.props.email}
                    isAuth={this.props.isAuth}
                    userPhoto={this.props.userPhoto}/>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    id: state.auth.userId,
    login: state.auth.login,
    email: state.auth.email,
    userPhoto: state.auth.userPhoto,
    isAuth: state.auth.isAuth,
})

export default compose<ComponentType>(
    connect<StateProps, unknown, unknown, RootState>(
        mapStateToProps,
        null
    ))(HeaderContainer)