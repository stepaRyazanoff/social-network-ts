import React, {ComponentType} from 'react'
import {connect} from 'react-redux'
import Users from './Users'
import {Filter, getUsers, subscribeToUser, unsubscribeFromUser, UsersType,} from '../../redux/usersReducer'
import {compose} from 'redux'
import {RootState} from '../../redux/redux-store'

export interface StateProps {
    users: UsersType[]
    totalUsersCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    followingInProgress: number[]
    filter: Filter
}

interface DispatchProps {
    getUsers: (pageSize: number, page: number, filter: Filter) => void
    subscribeToUser: (userId: number) => void
    unsubscribeFromUser: (userId: number) => void
}

class UsersContainer extends React.Component<StateProps & DispatchProps> {

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage, this.props.filter)
    }

    setCurrentPage(page: number) {
        this.props.getUsers(this.props.pageSize, page, this.props.filter)
    }

    onFilterChange(filter: Filter) {
        this.props.getUsers(this.props.pageSize, 1, filter)
    }

    subscribe(userId: number) {
        this.props.subscribeToUser(userId)
    }

    unsubscribe(userId: number) {
        this.props.unsubscribeFromUser(userId)
    }

    render() {
        return (
            <>
                <Users users={this.props.users}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
                       onFilterChange={this.onFilterChange.bind(this)}
                       setCurrentPage={this.setCurrentPage.bind(this)}
                       subscribe={this.subscribe.bind(this)}
                       unsubscribe={this.unsubscribe.bind(this)}/>
            </>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    pageSize: state.usersPage.pageSize,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
    filter: state.usersPage.filter
})

export default compose<ComponentType>
(connect<StateProps, DispatchProps, unknown, RootState>(mapStateToProps, {
    getUsers,
    subscribeToUser,
    unsubscribeFromUser,
}))(UsersContainer)