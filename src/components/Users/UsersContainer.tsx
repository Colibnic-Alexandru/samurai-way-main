import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount, toggleFollowingInProgress, toggleIsFetching,
    unfollow,
    UserType
} from "../../redux/reducerUsers";
import {Users} from "./Users";
import {Preloader} from "../common/Prepoder/Preloader";
import {usersAPI} from "../../api/api";


export type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
};

export type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setCurrentPage: (currentPage: number) => void,
    setUsersTotalCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress: (isFollowing: boolean, userId: number) => void
};

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType;

export class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items)
                this.props.setUsersTotalCount(data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items)
            })
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
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
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
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
    unfollow,
    toggleFollowingInProgress
})(UsersContainer);