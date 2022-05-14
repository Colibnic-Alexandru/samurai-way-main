import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    toggleFollowingInProgress, unfollowThunkCreator,
    UserType
} from "../../redux/reducerUsers";
import {Users} from "./Users";
import {Preloader} from "../common/Prepoder/Preloader";


export type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
};

export type MapDispatchToPropsType = {
    setCurrentPage: (currentPage: number) => void,
    toggleFollowingInProgress: (isFollowing: boolean, userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    followThunkCreator: (userId: number) => void
    unfollowThunkCreator: (userId: number) => void
};

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType;

export class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : ''}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.followThunkCreator}
                unfollowThunkCreator={this.props.unfollowThunkCreator}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    setCurrentPage,
    toggleFollowingInProgress,
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
})(UsersContainer);