import React, {useEffect} from 'react'
import {Navigate, useParams} from 'react-router'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {getUserStatus, setUserProfile} from '../../redux/profileReducer'
import {Preloader} from '../common/Preloader/Preloader'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {Posts} from './Posts/Posts'

const Profile = () => {
    const dispatch = useAppDispatch()
    const authorizedId = useAppSelector(state => state.auth.userId)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const profile = useAppSelector(state => state.profilePage.profile)
    let {profileId} = useParams()

    useEffect(() => {
        if (!profileId) profileId = authorizedId?.toString()
        if (profileId) {
            dispatch(setUserProfile(+profileId))
            dispatch(getUserStatus(+profileId))
        }
    }, [profileId, authorizedId])

    return (
        <>
            {!isAuth && <Navigate to='/login'/>}
            {!profile
                ? <Preloader/>
                :
                <>
                    <ProfileInfo isOwner={!profileId} {...profile}/>
                    <Posts/>
                </>}
        </>
    )
}

export default Profile
