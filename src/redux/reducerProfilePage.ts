import {profileAPI, usersAPI} from "../api/api";
import {AppStateType} from "./reduxStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type PostsType = {
    id: number
    message: string
    likeCount: number
}
export type ProfilePageType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

export type PhotosType = {
    small: string
    large: string
}

export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
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
    profile: null as  ProfilePageType | null,
    status: '',
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
            };
        case "SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {...state.profile!, photos: action.photos}
            }
        }
        default:
            return state;
    }
}

type ActionProfileType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>

export const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD_POST',
        messagesText: newPostText,
    } as const
}
const setUserProfile = (profile: ProfilePageType | null) => {
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
export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: 'SAVE_PHOTO_SUCCESS',
        photos: photos
    } as const
}

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionProfileType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionProfileType>

export const ThunkSetUserProfile = (userId: number | null): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const ThunkSetStatus = (status: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.getStatus(status)
    dispatch(setStatus(response.data));
}

export const ThunkUpdateStatus = (status: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: string): ThunkType => async (dispatch:ThunkDispatchType) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}


export const saveProfile = (profile: ProfilePageType | null): ThunkType => async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(ThunkSetUserProfile(getState().auth.userId))
    } else {
        // @ts-ignore
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}