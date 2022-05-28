import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import DialogContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import {AppStateType} from "./redux/reduxStore";
import {Preloader} from "./components/common/Prepoder/Preloader";


type MapDispatchPropsType = {
    initializeApp: () => void
}
type MapStatePropsType = {
    initialized: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class App extends React.Component<PropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path={"/dialogs"} render={() => <DialogContainer/>}/>
                    <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const MapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

export default compose<ComponentType>(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(MapStateToProps, {initializeApp}))(App);
