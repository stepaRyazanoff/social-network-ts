import React from "react"
import {connect} from "react-redux"
import Users from "./Users"
import {
    getUsers,
    subscribeToUser,
    unsubscribeFromUser,
} from "../../redux/usersReducer"
import {compose} from "redux"

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage)
    }

    setCurrentPage(page) {
        this.props.getUsers(this.props.pageSize, page)
    }

    subscribe(userId) {
        this.props.subscribeToUser(userId)
    }

    unsubscribe(userId) {
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
                       setCurrentPage={this.setCurrentPage.bind(this)}
                       subscribe={this.subscribe.bind(this)}
                       unsubscribe={this.unsubscribe.bind(this)}
                />
            </>
        )
    }
}

const mapStateToProps = state => ({
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    pageSize: state.usersPage.pageSize,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
})

export default compose(connect(mapStateToProps, {
    getUsers,
    subscribeToUser,
    unsubscribeFromUser,
}))(UsersContainer)