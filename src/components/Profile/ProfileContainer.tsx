import React from 'react';
import s from './Profile.module.css';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {ProfilePageType, ThunkSetUserProfile} from "../../redux/reducerProfilePage";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    profile: ProfilePageType
    isAuth: boolean
}

type MapDispatchPropsType = {
    ThunkSetUserProfile: (userId: number) => void
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

    }

    render() {

        return (
            <div className={s.profile}>
                <Profile profile={this.props.profile} />
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
}) as MapStatePropsType;

const WithUrlDataContainerComponent = withRouter(ProfileContainer);


export default withAuthRedirect( connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps,{ThunkSetUserProfile})(WithUrlDataContainerComponent));