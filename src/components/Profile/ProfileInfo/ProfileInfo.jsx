import React from 'react'
import cl from './ProfileInfo.module.css'
import image from '../../../assets/img/unknown-photo.webp'
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import Contacts from "./Contacts/Contacts"
import ProfileHead from "./ProfileHead/ProfileHead"
import ProfileData from "./ProfileData/ProfileData"
import ProfileDataForm from "./ProfileData/ProfileDataForm"

const ProfileInfo = ({
                         photos: {large},
                         fullName,
                         lookingForAJob,
                         lookingForAJobDescription,
                         aboutMe,
                         userStatus,
                         updateStatus,
                         isOwner,
                         setUserPhoto,
                         contacts,
                         setUpdatedProfile,
                         switchEditMode,
                         editMode,
                     }) => {

    const initialValuesObj = {
        fullName,
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        contacts,
    }

    const userLargePhoto = !large ? image : large

    const activateEditMode = () => {
        switchEditMode(true)
    }

    const onSelectFile = (e) => {
        if (e.target.files.length) {
            setUserPhoto(e.target.files[0])
        }
    }

    const onSubmit = profileData => {
        setUpdatedProfile(profileData)
    }

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
                                         onSubmit={onSubmit}
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
                                .map(key =>
                                    <Contacts
                                        key={key}
                                        contactTitle={key}
                                        contactValue={contacts[key]}/>)}
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


