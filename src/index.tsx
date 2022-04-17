import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux/reduxStore";
import {BrowserRouter} from "react-router-dom";
import {RoteStateType} from "./redux/state";


let rerenderEntireTree = (state: RoteStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}  dispatch={store.dispatch.bind(store)} store={store} />
        </BrowserRouter>,
        document.getElementById('root')
    );
};

rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});



reportWebVitals();
