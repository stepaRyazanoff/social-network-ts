import React from "react"
import cl from './Users.module.css'
import User from "./User/User"
import Pagination from "../common/Pagination/Pagination"
import Preloader from "../common/Preloader/Preloader"

const Users = ({
                   users,
                   totalUsersCount,
                   currentPage,
                   pageSize,
                   setCurrentPage,
                   subscribe,
                   unsubscribe,
                   isFetching,
                   followingInProgress,
               }) => {
    return (
        <div className={cl.users}>
            <div className={cl.inner}>
                <Pagination totalUsersCount={totalUsersCount}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            setCurrentPage={setCurrentPage}/>
                {isFetching
                    ? <Preloader/>
                    : users.map(u => <User key={u.id}
                                           userId={u.id}
                                           photos={u.photos}
                                           followed={u.followed}
                                           name={u.name}
                                           status={u.status}
                                           subscribe={subscribe}
                                           unsubscribe={unsubscribe}
                                           followingInProgress={followingInProgress}/>
                    )}
            </div>
        </div>
    )
}

export default Users