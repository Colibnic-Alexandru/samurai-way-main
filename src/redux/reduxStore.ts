import {combineReducers, createStore} from "redux";
import {profileReducer} from "./reducerProfilePage";
import {dialogsReducer} from "./reducerDialogsPage";
import {reducerUsers} from "./reducerUsers";
import {authReducer} from "./authReducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: reducerUsers,
    auth: authReducer,

})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

