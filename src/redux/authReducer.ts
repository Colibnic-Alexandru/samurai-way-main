
export type InitialStateType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}

const initialState: InitialStateType = {
    data: {
        id: 0,
        email: '',
        login: ''
    },
    resultCode: 0,
    messages: []
}

export const authReducer = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
                resultCode: 0,
                messages: []
            }
        default:
            return state
    }
}

type ActionUsersType = ReturnType<typeof setUserData>


export const setUserData = (data: {id:number,email: string,login: string}) => ({
    type: "SET_USER_DATA",
    payload: {
        data
    }
})