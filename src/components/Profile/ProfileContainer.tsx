import React, {ComponentType} from 'react'
import {compose} from "redux"
import Profile from "./Profile"
import {connect} from "react-redux"
import {withRouter} from "../../hoc/withRouter"
import Preloader from "../common/Preloader/Preloader"
import {
    getUserStatus, ProfileType,
    setEditMode,
    setPhoto,
    setUpdatedUserProfile,
    setUserProfile,
    updateUserStatus
} from "../../redux/profileReducer"
import {withRedirect} from "../../hoc/withRedirect"
import {RootState} from "../../redux/redux-store"
import {Nullable} from "../../redux/authReducer"
import {NavigateFunction} from "react-router-dom"

interface StateProps {
    isAuth: boolean
    editMode: boolean
    userStatus: string
    profile: Nullable<ProfileType>
    authorizedId: Nullable<number>
}

interface DispatchProps {
    setPhoto: (photoFile: File) => void
    setEditMode: (isFetching: boolean) => void
    getUserStatus: (profileId: number) => void,
    setUserProfile: (profileId: number) => void
    updateUserStatus: (newStatus: string) => void
    setUpdatedUserProfile: (profileData: ProfileType) => void
}

interface OwnProps {
    isOwner: boolean
    profile: Nullable<ProfileType>
    setUserPhoto: (photoFile: File) => void
    updateStatus: (newStatus: string) => void
    switchEditMode: (isFetching: boolean) => void
    setUpdatedProfile: (profileData: ProfileType) => void
}

interface PathParamsType {
    router: {
        location: Location
        navigate: NavigateFunction
        params: Record<'profileId', string | undefined>
    }
}

type Props = StateProps & DispatchProps & OwnProps & PathParamsType

class ProfileContainer extends React.Component<Props> {

    refreshProfile() {
        let profileId: Nullable<number> = Number(this.props.router.params.profileId)
        if (!profileId) profileId = this.props.authorizedId
        if (!profileId) console.error('ID should be exist in URI params or in state (\'authorizedId\')')
        else {
            this.props.setUserProfile(profileId)
            this.props.getUserStatus(profileId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.router.params.profileId !== this.props.router.params.profileId) {
            this.refreshProfile()
        }
    }

    updateStatus(newStatus: string) {
        this.props.updateUserStatus(newStatus)
    }

    setUserPhoto(photoFile: File) {
        this.props.setPhoto(photoFile)
    }

    setUpdatedProfile(profileData: ProfileType) {
        this.props.setUpdatedUserProfile(profileData)
    }

    switchEditMode(isFetching: boolean) {
        this.props.setEditMode(isFetching)
    }

    render() {
        return (
            <>
                {!this.props.profile
                    ? <Preloader/>
                    : <Profile isOwner={!this.props.router.params.profileId}
                               editMode={this.props.editMode}
                               profile={this.props.profile}
                               isAuth={this.props.isAuth}
                               userStatus={this.props.userStatus}
                               setUserPhoto={this.setUserPhoto.bind(this)}
                               setUpdatedProfile={this.setUpdatedProfile.bind(this)}
                               switchEditMode={this.switchEditMode.bind(this)}
                               updateStatus={this.updateStatus.bind(this)}/>}
            </>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    profile: state.profilePage.profile,
    userStatus: state.profilePage.status,
    editMode: state.profilePage.editMode,
    authorizedId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<ComponentType>(
    withRouter,
    withRedirect,
    connect<StateProps, DispatchProps, OwnProps, RootState>
    (mapStateToProps,
        {
            setPhoto,
            setEditMode,
            getUserStatus,
            setUserProfile,
            updateUserStatus,
            setUpdatedUserProfile,
        }))(ProfileContainer)
