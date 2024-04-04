import React, {FC} from 'react'
import cl from './ProfileInfo.module.css'
import image from '../../../assets/img/unknown-photo.webp'
import ProfileDataForm from './ProfileData/ProfileDataForm'
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks'
import {setEditMode, setUpdatedUserProfile} from '../../../redux/profileReducer'
import {IContacts, IPhotos, Nullable} from '../../../types/commonTypes'
import {ProfileStatus} from '../ProfileStatus/ProfileStatus'
import {ProfileData} from './ProfileData/ProfileData'
import {Contacts} from './Contacts/Contacts'
import {ProfileHead} from './ProfileHead/ProfileHead'

export interface IPropsProfile {
    photos: IPhotos
    contacts: Nullable<IContacts>
    fullName: Nullable<string>
    aboutMe: Nullable<string>
    lookingForAJobDescription: Nullable<string>
    isOwner: boolean
    lookingForAJob: boolean
}

export interface IProfileData {
    aboutMe: Nullable<string>
    contacts: Nullable<IContacts>
    fullName: Nullable<string>
    lookingForAJob: boolean
    lookingForAJobDescription: Nullable<string>
}

export const ProfileInfo: FC<IPropsProfile> = ({
                                     isOwner,
                                     photos: {large},
                                     fullName,
                                     lookingForAJob,
                                     lookingForAJobDescription,
                                     aboutMe,
                                     contacts,
                                 }) => {
    const dispatch = useAppDispatch()
    const editMode = useAppSelector(state => state.profilePage.editMode)

    const initialValuesObj = {
        fullName,
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        contacts,
    }

    const onSubmit = (profileData: IProfileData) => dispatch(setUpdatedUserProfile(profileData))

    const userLargePhoto = !large ? image : large

    return (
        <div className={cl.profileInfo}>
            <div>
                {isOwner &&
                    <div className={cl.editBtn}>
                        <button
                            onClick={() => dispatch(setEditMode(true))}
                            disabled={editMode}>
                            Редактировать профиль
                        </button>
                    </div>}
                {editMode
                    ? <div className={cl.wrapperEdit}>
                        <ProfileHead isOwner={isOwner} editMode={editMode} userPhoto={userLargePhoto}/>
                        <ProfileDataForm contacts={contacts} onSubmit={onSubmit} initialValues={initialValuesObj}/>
                    </div>
                    : <div className={cl.wrapper}>
                        <ProfileHead isOwner={isOwner} editMode={editMode} userPhoto={userLargePhoto}/>
                        <div>
                            <ProfileStatus/>
                            <span><b>Contacts: </b></span>
                            {contacts && Object.keys(contacts)
                                .map(key =>
                                    <Contacts key={key} contactTitle={key}
                                              contactValue={contacts[key as keyof typeof contacts]}/>)}
                        </div>
                        <div>
                            <ProfileData aboutMe={aboutMe}
                                         fullName={fullName}
                                         lookingForAJob={lookingForAJob}
                                         lookingForAJobDescription={lookingForAJobDescription}/>
                        </div>
                    </div>}
            </div>
        </div>
    )
}




