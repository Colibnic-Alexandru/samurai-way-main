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
    followingInProgress: Array<number>
    followThunkCreator: (userId: number) => void
    unfollowThunkCreator: (userId: number) => void
}


export const Users = (props: PropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 20) {
            pages.push(i);
        }
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
                            <img className={style.photo} src={u.photos?.small != null ? u.photos.small : userPhoto}
                                 alt=""/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                      onClick={() => {props.unfollowThunkCreator(u.id)}}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                      onClick={() => {props.followThunkCreator(u.id)}}>Follow</button>}
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


