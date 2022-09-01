import React, {ComponentType} from 'react';
import s from './Profile.module.css';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    ProfilePageType,
    savePhoto,
    ThunkSetStatus,
    ThunkSetUserProfile,
    ThunkUpdateStatus
} from "../../redux/reducerProfilePage";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    profile: ProfilePageType
    status: string
    authorizedUserId: number
    isAuth: boolean
}

type MapDispatchPropsType = {
    ThunkSetUserProfile: (userId: number) => void
    ThunkSetStatus: (userId: number) => void
    ThunkUpdateStatus: (status: string) => void
    savePhoto: (file: string) => void
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.ThunkSetUserProfile(userId);
        this.props.ThunkSetStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div className={s.profile}>
                <Profile
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.ThunkUpdateStatus}
                    savePhoto={this.props.savePhoto}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.id,
    isAuth: state.auth.isAuth
}) as MapStatePropsType;


export default compose<ComponentType>(
    connect(mapStateToProps, {
        ThunkSetUserProfile,
        ThunkSetStatus,
        ThunkUpdateStatus,
        savePhoto
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);