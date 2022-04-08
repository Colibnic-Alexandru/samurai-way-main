import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import { RoteStateType} from "./redux/state";


type PropsType = {
    state: RoteStateType
    addPost:(postMessage: string)=> void
    updateNewPostText:(newText: string)=> void
}

function App(props: PropsType) {

    return (
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path={"/dialogs"} render={() => <Dialogs dataForDialogs={props.state.dialogsPage}/>}/>
                    <Route path={"/profile"} render={() => <Profile dataForMessages={props.state.profilePage}
                                                                    addPost={props.addPost}
                                                                    updateNewPostText={props.updateNewPostText}
                    />}/>
                </div>
            </div>
    );
}

export default App;
