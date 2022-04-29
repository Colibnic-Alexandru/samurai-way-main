
export type UserType = {
    id:number
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
}

const initialState:InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}

export const reducerUsers = (state: InitialStateType = initialState, action: ActionUsersType):InitialStateType => {
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
        default:
            return state
    }
}

type ActionUsersType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>
    | ReturnType<typeof toggleIsFetchingAC>

export const followAC = (userID: number) => {
    return{
        type: 'FOLLOW',
        usersID: userID
    }as const
}

export const unfollowAC = (userID: number) => {
    return{
        type: 'UNFOLLOW',
        usersID: userID
    }as const
}

export const setUsersAC = (users: Array<UserType>) => {
    return{
        type: 'SET-USERS',
        users: users
    }as const
}

export const setCurrentPageAC = (currentPage:number) => {
    return{
        type:'SET-CURRENT-PAGE',
        currentPage
    }as const
}

export const setUsersTotalCountAC = (totalUsersCount:number) => {
    return{
        type: 'SET-USERS-TOTAL-COUNT',
        totalUsersCount
    }as const
}

export const toggleIsFetchingAC = (isFetching:boolean) => {
    return{
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    }as const
}