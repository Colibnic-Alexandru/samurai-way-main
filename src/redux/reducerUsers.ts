
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
    users: Array<UserType>
}

const initialState:InitialStateType = {
    users: []
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
                users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

type ActionUsersType = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>

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