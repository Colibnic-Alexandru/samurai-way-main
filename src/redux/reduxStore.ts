import {combineReducers, createStore} from "redux";
import {profileReducer} from "./reducerProfilePage";
import {dialogsReducer} from "./reducerDialogsPage";
import {reducerUsers} from "./reducerUsers";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: reducerUsers,

})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

