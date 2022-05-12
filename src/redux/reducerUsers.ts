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
    pageSize: 100,
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

type ActionUsersType = ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>

export const follow = (userID: number) => {
    return {
        type: 'FOLLOW',
        usersID: userID
    } as const
}

export const unfollow = (userID: number) => {
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