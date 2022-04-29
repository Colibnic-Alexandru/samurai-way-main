import React from 'react';
import s from './Profile.module.css';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfilePageType, setUserProfile} from "../../redux/reducerProfilePage";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    profile: ProfilePageType
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfilePageType) => void
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType
type OwnPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(res => {
                this.props.setUserProfile(res.data);
            });

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
    profile: state.profilePage.profile
}) as MapStatePropsType;

const WithUrlDataContainerComponent = withRouter(ProfileContainer);


export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps,{setUserProfile})(WithUrlDataContainerComponent);