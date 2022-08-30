import React from 'react';
import style from './Paginator.module.css'

type PaginatorProps = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator: React.FC<PaginatorProps> = ({
                                                        totalUsersCount,
                                                        pageSize,
                                                        currentPage,
                                                        onPageChanged
                                                    }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 20) {
            pages.push(i);
        }
    }

    return (
        <div>
            {pages.map(el => {
                return <span className={`${currentPage === el ? style.selectedPage : ''}`}
                             onClick={() => {
                                 onPageChanged(el)
                             }}>{el}</span>
            })}
        </div>
    )
};
