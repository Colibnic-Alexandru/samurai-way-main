import React from "react";
import style from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg"
import {UserType} from "../../redux/reducerUsers";
import {NavLink} from 'react-router-dom';

type PropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


export const Users = (props:PropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(el => {
                    return <span className={props.currentPage === el ? style.selectedPage : ''}
                                 onClick={() => {
                                     props.onPageChanged(el)
                                 }}>{el}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img className={style.photo} src={u.photos?.small != null ? u.photos.small : userPhoto} alt=""/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.city"}</div>
                            <div>{"u.location.country"}</div>
                        </span>
                </span>
                </div>)
            }
        </div>
    )
}


