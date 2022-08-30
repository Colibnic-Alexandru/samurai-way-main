import React from "react";
import {UserType} from "../../redux/reducerUsers";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

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
    return (
        <div>
            <Paginator
                pageSize={props.pageSize}
                totalUsersCount={props.totalUsersCount}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
            />
            {
                props.users.map(u => <User user={u}
                                           follow={props.followThunkCreator}
                                           unfollow={props.unfollowThunkCreator}
                                           followingInProgress={props.followingInProgress}
                    />
                )
            }
        </div>
    )
}


