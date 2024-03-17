import cn from "classnames"
import cl from './ProfileHead.module.css'
import React, {ChangeEvent, FC} from "react"

interface Props {
    userLargePhoto: string
    isOwner: boolean
    editMode: boolean
    onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProfileHead: FC<Props> = ({
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