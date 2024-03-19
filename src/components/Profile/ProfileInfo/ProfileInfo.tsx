import cl from './ProfileInfo.module.css'
import Contacts from "./Contacts/Contacts"
import React, {ChangeEvent, FC} from 'react'
import ProfileData from "./ProfileData/ProfileData"
import ProfileHead from "./ProfileHead/ProfileHead"
import {ContactsType} from "../../../types/commonTypes"
import {ProfileType} from "../../../redux/profileReducer"
import image from '../../../assets/img/unknown-photo.webp'
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import ProfileDataForm from "./ProfileData/ProfileDataForm"
import {ProfileProps} from "../Profile"

interface Props extends ProfileProps {
}

export interface InitialValuesObj {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
}

const ProfileInfo: FC<Props> = ({
                                    profile: {
                                        fullName,
                                        lookingForAJob,
                                        lookingForAJobDescription,
                                        contacts,
                                        aboutMe,
                                        photos: {large},
                                    },
                                    userStatus,
                                    updateStatus,
                                    isOwner,
                                    setUserPhoto,
                                    setUpdatedProfile,
                                    switchEditMode,
                                    editMode,
                                }) => {

    const initialValuesObj: InitialValuesObj = {
        fullName,
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        contacts,
    }

    const userLargePhoto = !large ? image : large

    const activateEditMode = () => switchEditMode(true)

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) setUserPhoto(e.target.files[0])
    }

    const handleSubmit = (profileData: ProfileType) => setUpdatedProfile(profileData)


    return (
        <div className={cl.profileInfo}>
            <div>
                {isOwner &&
                    <div className={cl.editBtn}>
                        <button
                            onClick={activateEditMode}
                            disabled={editMode}>
                            Редактировать профиль
                        </button>
                    </div>}
                {editMode
                    ? <div className={cl.wrapperEdit}>
                        <ProfileHead isOwner={isOwner}
                                     editMode={editMode}
                                     onSelectFile={onSelectFile}
                                     userLargePhoto={userLargePhoto}/>
                        <ProfileDataForm contacts={contacts}
                                         onSubmit={handleSubmit}
                                         initialValues={initialValuesObj}/>
                    </div>
                    : <div className={cl.wrapper}>
                        <div>
                            <ProfileHead isOwner={isOwner}
                                         editMode={editMode}
                                         onSelectFile={onSelectFile}
                                         userLargePhoto={userLargePhoto}/>
                        </div>
                        <div>
                            <ProfileStatus userStatus={userStatus}
                                           updateStatus={updateStatus}/>
                            <span><b>Contacts: </b></span>
                            {Object.keys(contacts)
                                .map(key => <Contacts key={key}
                                                      contactTitle={key}
                                                      contactValue={contacts[key as keyof ContactsType]}/>)}
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

export default ProfileInfo


