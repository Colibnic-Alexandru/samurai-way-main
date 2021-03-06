import {profileAPI, usersAPI} from "../api/api";
import {AppStateType} from "./reduxStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type PostsType = {
    id: number
    message: string
    likeCount: number
}


export type ProfilePageType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    } | null
}

export type InitialStateType = typeof initialState

const initialState = {
    posts: [
        {id: 1, message: 'Hello', likeCount: 25},
        {id: 2, message: 'Hello my friend', likeCount: 27},
        {id: 3, message: 'My name Alex', likeCount: 45},
        {id: 4, message: 'Hi hwo are you?', likeCount: 15},
        {id: 5, message: 'Hello', likeCount: 75},
    ] as Array<PostsType>,
    profile: null as ProfilePageType | null,
    status: "" as string,
};


export const profileReducer = (state: InitialStateType = initialState, action: ActionProfileType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 6,
                message: action.messagesText,
                likeCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case "SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            };
        case "SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

type ActionProfileType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>

export const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD_POST',
        messagesText: newPostText,
    } as const
}
const setUserProfile = (profile: ProfilePageType) => {
    return {
        type: 'SET_USER_PROFILE',
        profile: profile
    } as const
}

const setStatus = (status: string) => {
    return {
        type: 'SET_STATUS',
        status: status
    } as const
}

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionProfileType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionProfileType>

export const ThunkSetUserProfile = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}

export const ThunkSetStatus = (status: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        profileAPI.getStatus(status)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
}

export const ThunkUpdateStatus = (status: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        console.log(status)
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}
