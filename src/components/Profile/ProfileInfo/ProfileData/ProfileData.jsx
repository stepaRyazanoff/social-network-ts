import cl from './ProfileDataForm.module.css'
import React from "react"

const ProfileData = ({fullName, aboutMe, lookingForAJob, lookingForAJobDescription}) => {
    return (
        <div className={cl.about}>
            <div className={cl.name}>
                {fullName}
            </div>
            <ul>
                <li>
                    <b>About me: </b>
                    {aboutMe}
                </li>
                <li>
                    <b>LookingForAJob: </b>
                    {lookingForAJob ? 'yes' : 'no'}
                </li>
                {lookingForAJob &&
                    <li>
                        <b>My professional skills: </b>
                        {lookingForAJobDescription}
                    </li>}
            </ul>
        </div>
    )
}

export default ProfileData