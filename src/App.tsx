import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route,} from "react-router-dom";
import {RoteStateType} from "./redux/state";


type PropsType = {
    state: RoteStateType
}

function App(props: PropsType) {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path={"/dialogs"} render={() => <Dialogs dataForDialogs={props.state.dialogsPage}/>}/>
                    <Route path={"/profile"} render={() => <Profile dataForMessages={props.state.profilePage}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
