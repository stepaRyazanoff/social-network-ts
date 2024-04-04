import cl from './ProfileDataForm.module.css'
import React, {FC} from 'react'
import {createField} from '../../../../helpers/createField'
import {Input} from '../../../common/FormsControls/FormsControls'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {IContacts, Nullable} from '../../../../types/commonTypes'
import {IProfileData, IPropsProfile} from '../ProfileInfo'

interface IProps {
    contacts: Nullable<IContacts>
}

const ProfileDataForm: FC<InjectedFormProps<IProfileData, IProps> & IProps> =
    ({handleSubmit, contacts, error}) => {
        return (
            <form className={cl.aboutEdit}
                  onSubmit={handleSubmit}>
                <span className={cl.spanAbout}><b>About: </b></span>
                <div className={cl.aboutField}>
                    <span><b>Full name: </b></span>
                    {createField<keyof IPropsProfile>(
                        'fullName',
                        undefined,
                        'fieldError',
                        Input,
                        'Full name',
                        'text',
                        false,
                        undefined,
                        null)}
                    <span><b>About me: </b></span>
                    {createField<keyof IPropsProfile>(
                        'aboutMe',
                        undefined,
                        'fieldError',
                        Input,
                        'About me',
                        'text',
                        false,
                        undefined,
                        null)}
                    <div className={cl.checkbox}>
                        <span><b>looking for a gob: </b></span>
                        {createField<keyof IPropsProfile>(
                            'lookingForAJob',
                            undefined,
                            null,
                            Input,
                            null,
                            'checkbox',
                            false,
                            undefined,
                            null)}
                    </div>
                    {createField<keyof IPropsProfile>(
                        'lookingForAJobDescription',
                        undefined,
                        'fieldError',
                        Input,
                        'My professional skills',
                        'text',
                        false,
                        undefined,
                        null)}
                </div>
                {error && <div className={cl.textError}><span>{error}</span></div>}
                <span className={cl.spanContacts}><b>Contacts: </b></span>
                {contacts && Object.keys(contacts)
                    .map(key =>
                        <div className={cl.contactsField} key={key}>
                            <span><b>{key}: </b></span>
                            {createField<`contacts.${keyof typeof contacts}`>(
                                `contacts.${key as keyof IContacts}`,
                                undefined,
                                null,
                                Input,
                                key,
                                'text',
                                false,
                                undefined,
                                null)}
                        </div>)}
                <button className={cl.formBtn}>save</button>
            </form>
        )
    }

export default reduxForm<IProfileData, IProps>({
    form: 'profileData'
})(ProfileDataForm)
