import {usersAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {updateObjectInArray} from "../utils/helpers/object-helpers";

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
    portionSize: number
}

const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionSize: 10
}

export const reducerUsers = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, 'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, 'id', {followed: false})
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

export const toggleFollowingInProgress = (isFetching: boolean, usersID: number) => {
    return {
        type: 'TOGGLE-IS-FOLLOWING',
        isFetching,
        usersID
    } as const
}


export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
        dispatch(setCurrentPage(currentPage))
    }
}

const followUnfollowFlow = async (dispatch: ThunkDispatchType, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}

export const followThunkCreator = (userID: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        await followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), acceptFollow)
    }
}

export const unfollowThunkCreator = (userID: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        await followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), acceptUnfollow)
    }
}