import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {followAC, InitialStateType, setUsersAC, unfollowAC, UserType} from "../../redux/reducerUsers";
import {Dispatch} from "redux";
import {Users} from "./Users";


type MapStateToPropsType = {
    usersPage: InitialStateType
}


type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        usersPage: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);