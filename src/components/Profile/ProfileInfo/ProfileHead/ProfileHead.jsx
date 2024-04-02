import cn from "classnames"
import cl from './ProfileHead.module.css'
import React from "react"

const ProfileHead = ({
                         userLargePhoto,
                         isOwner,
                         editMode,
                         onSelectFile,
                     }) => {
    return (
        <div className={cl.profileHead}>
            <img src={userLargePhoto} alt=""/>
            {isOwner && editMode &&
                <div className={cn(cl.inputFile)}>
                    <label className={cl.labelInputFile}>
                        выберите файл
                        <input onChange={onSelectFile}
                               type="file"/>
                    </label>
                </div>}
        </div>
    )
}

export default ProfileHead