import {combineReducers, createStore} from "redux";
import {profileReducer} from "./reducerProfilePage";
import {dialogsReducer} from "./reducerDialogsPage";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
})


export const store = createStore(reducers);

