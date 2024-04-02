import React from 'react'
import {compose} from "redux"
import Profile from "./Profile"
import {connect} from "react-redux"
import {withRouter} from "../../hoc/withRouter"
import Preloader from "../common/Preloader/Preloader"
import {
    getUserStatus,
    setEditMode,
    setPhoto,
    setUpdatedUserProfile,
    setUserProfile,
    updateUserStatus
} from "../../redux/profileReducer"
import {withRedirect} from "../../hoc/withRedirect";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let profileId = this.props.router.params.profileId
        if (!profileId) profileId = this.props.authorizedId
        this.props.setUserProfile(profileId)
        this.props.getUserStatus(profileId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.router.params.profileId !== this.props.router.params.profileId) {
            this.refreshProfile()
        }
    }

    updateStatus(newStatus) {
        this.props.updateUserStatus(newStatus)
    }

    setUserPhoto(photoPile) {
        this.props.setPhoto(photoPile)
    }

    setUpdatedProfile(profileData) {
        this.props.setUpdatedUserProfile(profileData)
    }

    switchEditMode(isFetching) {
        this.props.setEditMode(isFetching)
    }

    render() {
        return (
            <>
                {!this.props.profile
                    ? <Preloader/>
                    : <Profile isOwner={!this.props.router.params.profileId}
                               setUserPhoto={this.setUserPhoto.bind(this)}
                               editMode={this.props.editMode}
                               {...this.props.profile}
                               isAuth={this.props.isAuth}
                               userStatus={this.props.userStatus}
                               setUpdatedProfile={this.setUpdatedProfile.bind(this)}
                               switchEditMode={this.switchEditMode.bind(this)}
                               updateStatus={this.updateStatus.bind(this)}/>}
            </>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profilePage.profile,
    userStatus: state.profilePage.status,
    editMode: state.profilePage.editMode,
    authorizedId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose(
    withRouter,
    withRedirect,
    connect
    (mapStateToProps,
        {
            getUserStatus,
            setUserProfile,
            updateUserStatus,
            setPhoto,
            setUpdatedUserProfile,
            setEditMode,
        }))(ProfileContainer)
