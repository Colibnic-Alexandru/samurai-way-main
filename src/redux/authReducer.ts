import {authAPI} from "../api/api";
import {AppStateType} from "./reduxStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";

export type InitialStateType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
    isAuth: boolean
    userId: number | null
}

const initialState: InitialStateType = {
    data: {
        id: 0,
        email: '',
        login: ''
    },
    resultCode: 0,
    messages: [],
    isAuth: false,
    userId: null
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

type ActionUsersType = ReturnType<typeof setUserData> | ReturnType<typeof stopSubmit>


const setUserData = (data: { id: number, email: string, login: string, isAuth: boolean }) => ({
    type: "SET_USER_DATA",
    payload: {
        data
    }
} as const)


export type AuthThunkType = ThunkAction<any, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>

export const getAuthUserData = (): AuthThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setUserData({id, email, login, isAuth: true}))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AuthThunkType =>
    async (dispatch: ThunkDispatchType) => {
        let response = await authAPI.login(email, password, rememberMe,)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const logout = (): AuthThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData({id: 0, email: '', login: '', isAuth: false}))
    }
}