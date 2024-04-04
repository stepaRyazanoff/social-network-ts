import React, {useEffect} from 'react'
import cl from './Users.module.css'
import User from './User/User'
import Pagination from '../common/Pagination/Pagination'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {getUsers} from '../../redux/usersReducer'
import {Preloader} from '../common/Preloader/Preloader'

export const Users = () => {
    const dispatch = useAppDispatch()
    const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
    const currentPage = useAppSelector(state => state.usersPage.currentPage)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const users = useAppSelector(state => state.usersPage.users)
    const isFetching = useAppSelector(state => state.usersPage.isFetching)

    useEffect(() => {
        dispatch(getUsers(pageSize, currentPage))
    }, [])

    const setCurrentPage = (page: number) => dispatch(getUsers(pageSize, page))

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
                                           status={u.status}/>)}
            </div>
        </div>
    )
}



