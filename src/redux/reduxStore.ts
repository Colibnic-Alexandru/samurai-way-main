import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./reducerProfilePage";
import {dialogsReducer} from "./reducerDialogsPage";
import {reducerUsers} from "./reducerUsers";
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./appReducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: reducerUsers,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

