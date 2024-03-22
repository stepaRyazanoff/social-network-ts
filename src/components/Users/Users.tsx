import React, {FC} from 'react'
import cl from './Users.module.css'
import User from './User/User'
import Pagination from '../common/Pagination/Pagination'
import Preloader from '../common/Preloader/Preloader'
import {StateProps} from './UsersContainer'
import UsersSearchForm from './UsersSearchForm'
import {Filter, UsersType} from '../../redux/usersReducer'

interface Props {
    users: UsersType[]
    totalUsersCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    followingInProgress: number[]
    subscribe: (userId: number) => void
    unsubscribe: (userId: number) => void
    setCurrentPage: (page: number) => void
    onFilterChange: (filter: Filter) => void
}

const Users: FC<Props> = ({
                              users,
                              totalUsersCount,
                              currentPage,
                              pageSize,
                              setCurrentPage,
                              subscribe,
                              unsubscribe,
                              isFetching,
                              followingInProgress,
                              onFilterChange
                          }) => {
    return (
        <div className={cl.users}>
            <div className={cl.inner}>
                <UsersSearchForm onFilterChange={onFilterChange}/>
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
                                           followingInProgress={followingInProgress}/>)}
            </div>
        </div>
    )
}

export default Users