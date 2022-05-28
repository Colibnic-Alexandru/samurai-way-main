import {authAPI} from "../api/api";
import {AppStateType} from "./reduxStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type InitialStateType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
    isAuth: boolean
}

const initialState: InitialStateType = {
    data: {
        id: 0,
        email: '',
        login: ''
    },
    resultCode: 0,
    messages: [],
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
                resultCode: 0,
                messages: [],
                isAuth: true
            }
        default:
            return state
    }
}

type ActionUsersType = ReturnType<typeof setUserData>


const setUserData = (data: { id: number, email: string, login: string, isAuth:boolean }) => ({
    type: "SET_USER_DATA",
    payload: {
        data
    }
})


export type AuthThunkType = ThunkAction<void, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>

export const getAuthUserData = (): AuthThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setUserData({id, email, login, isAuth: true}))
                }

            })
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AuthThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.login(email, password, rememberMe,)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }
            })
    }
}

export const logout = (): AuthThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserData({id: 0, email: '', login: '', isAuth: false}))
                }
            })
    }
}