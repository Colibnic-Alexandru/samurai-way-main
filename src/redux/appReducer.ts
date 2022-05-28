import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const initialState = {
    initialized: true
}

export const appReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type ActionType = ReturnType<typeof initializedSuccess>

export const initializedSuccess = () => ({
    type: "INITIALIZED_SUCCESS"
} as const)

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>

export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch((getAuthUserData()));
    promise.then(() => {
        dispatch(initializedSuccess());
    })
}