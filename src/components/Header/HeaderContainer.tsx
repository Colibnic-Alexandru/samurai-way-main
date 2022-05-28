import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";


export type MapStateToPropsType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
       this.props.getAuthUserData()
    }

    render() {
        return <Header
            userId={this.props.userId}
            login={this.props.login}
            logout={this.props.logout}
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
(mapStateToProps,{getAuthUserData, logout})(HeaderContainer);