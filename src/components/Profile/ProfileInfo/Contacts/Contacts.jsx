import React from "react"
import cl from "./Contacts.module.css"

const Contacts = ({contactTitle, contactValue}) => {
    return (
        <div className={cl.contacts}>
            <b>{contactTitle}: </b>{contactValue}
        </div>

    )
}

export default Contacts


