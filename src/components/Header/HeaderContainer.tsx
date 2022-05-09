import React from 'react';
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setUserData} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

export type MapStateToPropsType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    setUserData: (userData: {
        login: string
        id: number
        email: string
        isAuth: boolean
    }) => void

}

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    let {id, email, login, isAuth} = res.data.data;
                    this.props.setUserData({id, email, login, isAuth});
                }
            })
    }

    render() {
        return <Header
            userId={this.props.userId}
            login={this.props.login}
            email={this.props.email}
            isAuth={this.props.isAuth}
        />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        userId: state.auth.data.id,
        login: state.auth.data.login,
        email: state.auth.data.email,
        isAuth: state.auth.resultCode === 0
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps,{setUserData})(HeaderContainer);