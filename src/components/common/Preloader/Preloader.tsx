import React, {FC} from "react"
import cl from './Preloader.module.css'

const Preloader: FC = () =>{
    return (
        <div className={cl.preloader}></div>
    )
}

export default Preloader