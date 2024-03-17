import cl from './ProfileDataForm.module.css'
import React, {FC} from "react"
import {createField} from "../../../../helpers/createField"
import {Input} from "../../../common/FormsControls/FormsControls"
import {InjectedFormProps, reduxForm} from "redux-form"
import {ContactsType} from "../../../../types/commonTypes"
import {ProfileType} from "../../../../redux/profileReducer"

interface Props {
    contacts: ContactsType
}

type ProfileKey = keyof ProfileType
type ContactsKey = `contacts.${keyof ContactsType}`

const ProfileDataForm: FC<InjectedFormProps<ProfileType, Props> & Props> =
    ({handleSubmit, contacts, error}) => {
        return (
            <form className={cl.aboutEdit} onSubmit={handleSubmit}>
                <span className={cl.spanAbout}><b>About: </b></span>
                <div className={cl.aboutField}>
                    <span><b>Full name: </b></span>
                    {createField<ProfileKey>(
                        "fullName",
                        null,
                        'fieldError',
                        Input,
                        'Full name',
                        'text',
                        false,
                        null,
                        undefined)}
                    <span><b>About me: </b></span>
                    {createField<ProfileKey>(
                        'aboutMe',
                        null,
                        'fieldError',
                        Input,
                        'About me',
                        'text',
                        false,
                        null,
                        undefined)}
                    <div className={cl.checkbox}>
                        <span><b>looking for a gob: </b></span>
                        {createField<ProfileKey>(
                            'lookingForAJob',
                            null,
                            undefined,
                            Input,
                            undefined,
                            'checkbox',
                            false,
                            null,
                            undefined)}
                    </div>
                    {createField<ProfileKey>(
                        'lookingForAJobDescription',
                        null,
                        'fieldError',
                        Input,
                        'My professional skills',
                        'text',
                        false,
                        null,
                        undefined)}
                </div>
                {error && <div className={cl.textError}><span>{error}</span></div>}
                <span className={cl.spanContacts}><b>Contacts: </b></span>
                {Object.keys(contacts).map(key => <div className={cl.contactsField} key={key}>
                    <span><b>{key}: </b></span>
                    {createField<ContactsKey>(
                        `contacts.${key as keyof ContactsType}`,
                        null,
                        undefined,
                        Input,
                        key,
                        'text',
                        false,
                        null,
                        undefined)}
                </div>)}
                <button className={cl.formBtn}>save</button>
            </form>
        )
    }

export default reduxForm<ProfileType, Props>({
    form: 'profileData'
})(ProfileDataForm)
