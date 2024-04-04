import cl from './ProfileDataForm.module.css'
import React, {FC} from 'react'
import {Nullable} from '../../../../types/commonTypes'

interface IProps {
    aboutMe: Nullable<string>
    fullName: Nullable<string>
    lookingForAJob: boolean
    lookingForAJobDescription: Nullable<string>
}

export const ProfileData: FC<IProps> =
    ({fullName, aboutMe, lookingForAJob, lookingForAJobDescription}) => {
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

