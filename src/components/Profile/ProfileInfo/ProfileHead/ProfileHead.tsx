import cn from 'classnames'
import cl from './ProfileHead.module.css'
import React, {ChangeEvent, FC} from 'react'
import {setPhoto} from '../../../../redux/profileReducer'
import {useAppDispatch} from '../../../../hooks/hooks'

interface IProps {
    isOwner: boolean
    editMode: boolean
    userPhoto: string
}

export const ProfileHead: FC<IProps> = ({userPhoto, isOwner, editMode,}) => {
    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        e.target.files?.length && dispatch(setPhoto(e.target.files[0]))

    return (
        <div className={cl.profileHead}>
            <img src={userPhoto} alt=""/>
            {isOwner && editMode &&
                <div className={cn(cl.inputFile)}>
                    <label className={cl.labelInputFile}>
                        выберите файл
                        <input onChange={handleChange}
                               type="file"/>
                    </label>
                </div>}
        </div>
    )
}

