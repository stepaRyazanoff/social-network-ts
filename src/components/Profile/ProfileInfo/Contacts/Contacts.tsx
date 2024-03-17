import React, {FC} from "react"
import cl from "./Contacts.module.css"

interface Contacts {
    contactTitle: string
    contactValue: string
}

const Contacts: FC<Contacts> = ({contactTitle, contactValue}) => {
    return (
        <div className={cl.contacts}>
            <b>{contactTitle}: </b>{contactValue}
        </div>

    )
}

export default Contacts


