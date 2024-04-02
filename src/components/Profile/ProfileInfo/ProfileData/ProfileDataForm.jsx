import cl from './ProfileDataForm.module.css'
import React from "react"
import {createField} from "../../../../helpers/createField"
import {Input} from "../../../common/FormsControls/FormsControls"
import {reduxForm} from "redux-form"

const ProfileDataForm = ({handleSubmit, contacts, error}) => {
    return (
        <form className={cl.aboutEdit}
              onSubmit={handleSubmit}>
            <span className={cl.spanAbout}><b>About: </b></span>
            <div className={cl.aboutField}>
                <span><b>Full name: </b></span>
                {createField(
                    'fullName',
                    [],
                    'fieldError',
                    Input,
                    'Full name',
                    'text',
                )}
                <span><b>About me: </b></span>
                {createField(
                    'aboutMe',
                    [],
                    'fieldError',
                    Input,
                    'About me',
                    'text')}
                <div className={cl.checkbox}>
                    <span><b>looking for a gob: </b></span>
                    {createField(
                        'lookingForAJob',
                        [],
                        null,
                        Input,
                        null,
                        'checkbox')}
                </div>
                {createField(
                    'lookingForAJobDescription',
                    [],
                    'fieldError',
                    Input,
                    'My professional skills',
                    'text')}
            </div>
            {error && <div className={cl.textError}><span>{error}</span></div>}
            <span className={cl.spanContacts}><b>Contacts: </b></span>
            {Object.keys(contacts)
                .map(key =>
                    <div className={cl.contactsField} key={key}>
                        <span><b>{key}: </b></span>
                        {createField(
                            'contacts.' + key,
                            [],
                            null,
                            Input,
                            key,
                            'text')}
                    </div>)}
            <button className={cl.formBtn}>save</button>
        </form>
    )
}

export default reduxForm({
    form: 'profileData'
})(ProfileDataForm)
