import {usersAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";

export type UserType = {
    id: number
    photos: {
        small: string
        large: string
    } | null
    followed: boolean
    name: string
    status: string
    location: LocationType
}

type LocationType = {
    city: string
    country: string
}

export type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

const initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const reducerUsers = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.usersID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.usersID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case 'SET-USERS':
            return {
                ...state,
                users: action.users
            }
        case "SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET-USERS-TOTAL-COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case "TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }

        case "TOGGLE-IS-FOLLOWING":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.usersID]
                    : state.followingInProgress.filter(id => id !== action.usersID)
            }
        default:
            return state
    }
}

type ActionUsersType = ReturnType<typeof acceptFollow>
    | ReturnType<typeof acceptUnfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>

export const acceptFollow = (userID: number) => {
    return {
        type: 'FOLLOW',
        usersID: userID
    } as const
}

export const acceptUnfollow = (userID: number) => {
    return {
        type: 'UNFOLLOW',
        usersID: userID
    } as const
}

export const setUsers = (users: Array<UserType>) => {
    return {
        type: 'SET-USERS',
        users: users
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}

export const setUsersTotalCount = (totalUsersCount: number) => {
    return {
        type: 'SET-USERS-TOTAL-COUNT',
        totalUsersCount
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    } as const
}

export const toggleFollowingInProgress = (isFetching: boolean, usersID:number) => {
    return {
        type: 'TOGGLE-IS-FOLLOWING',
        isFetching,
        usersID
    }as const
}


export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>

export const getUsersThunkCreator = (currentPage: number, pageSize: number):ThunkType => {
    return (dispatch:ThunkDispatchType) => {

        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage,pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setUsersTotalCount(data.totalCount));
                dispatch(setCurrentPage(currentPage))
            })
    }
}

export const followThunkCreator = (userID: number):ThunkType => {
    return (dispatch:ThunkDispatchType) => {
        dispatch(toggleFollowingInProgress(true, userID));
        usersAPI.follow(userID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(acceptFollow(userID));
                }
                dispatch(toggleFollowingInProgress(false, userID));
            })
    }
}

export const unfollowThunkCreator = (userID: number):ThunkType => {
    return (dispatch:ThunkDispatchType) => {
        dispatch(toggleFollowingInProgress(true, userID));
        usersAPI.unfollow(userID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(acceptUnfollow(userID));
                }
                dispatch(toggleFollowingInProgress(false, userID));
            })
    }
}