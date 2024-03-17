import React, {FC} from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostsContainer from "./Posts/PostsContainer"
import {ProfileType} from "../../redux/profileReducer"

export interface ProfileProps {
    profile: ProfileType
    isAuth: boolean
    isOwner: boolean
    editMode: boolean
    userStatus: string
    setUserPhoto: (photoFile: File) => void
    updateStatus: (newStatus: string) => void
    switchEditMode: (isFetching: boolean) => void
    setUpdatedProfile: (profileData: ProfileType) => void
}

const Profile: FC<ProfileProps> = (props) => {
    return (
        <>
            <ProfileInfo {...props}/>
            <PostsContainer/>
        </>
    )
}

export default Profile
