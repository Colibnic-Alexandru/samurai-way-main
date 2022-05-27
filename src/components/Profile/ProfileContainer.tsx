import React, {ComponentType} from 'react';
import s from './Profile.module.css';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {ProfilePageType, ThunkSetStatus, ThunkSetUserProfile, ThunkUpdateStatus} from "../../redux/reducerProfilePage";
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
}

type MapDispatchPropsType = {
    ThunkSetUserProfile: (userId: number) => void
    ThunkSetStatus: (userId: number) => void
    ThunkUpdateStatus: (status: string) => void
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 23457;
        }
        this.props.ThunkSetUserProfile(userId);
        this.props.ThunkSetStatus(userId);
    }

    render() {

        console.log(this.props)
        return (
            <div className={s.profile}>
                <Profile profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.ThunkUpdateStatus}/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
}) as MapStatePropsType;


export default compose<ComponentType>(
    connect(mapStateToProps, {
        ThunkSetUserProfile,
        ThunkSetStatus,
        ThunkUpdateStatus
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);