import React, {useEffect, useState} from "react"
import cl from './Pagination.module.css'
import cn from "classnames"

const Pagination = ({setCurrentPage, totalUsersCount, currentPage, pageSize, portionSize = 10}) => {

    const totalPages = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    const [portionNumber, setPortionNumber] = useState(1)
    const portionsCount = Math.ceil(totalPages / portionSize)
    const leftBorderPortion = (portionNumber - 1) * portionSize + 1
    const rightBorderPortion = portionNumber * portionSize

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionSize))
    }, [currentPage, portionSize])

    const onNextButtonClick = () => {
        setPortionNumber(portionNumber + 1)
    }
    const onPrevButtonClick = () => {
        setPortionNumber(portionNumber - 1)
    }

    const onClickToNumber = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={cl.pagination}>
            <div className={cl.paginationPages}>
                {portionNumber > 1 && <span className={cl.prevBtn} onClick={onPrevButtonClick}>{'<'}</span>}
                {pages.filter(p => p >= leftBorderPortion && p <= rightBorderPortion).map(p => <span
                    className={cn({[cl.active]: currentPage === p}, cl.pageNumber)}
                    onClick={() => onClickToNumber(p)}
                    key={p}>{p}</span>)}
                {portionsCount > portionNumber && <span className={cl.nextBtn} onClick={onNextButtonClick}>{'>'}</span>}
            </div>
        </div>
    )
}

export default Pagination