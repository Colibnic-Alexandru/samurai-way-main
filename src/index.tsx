import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store, StoreType} from "./redux/state";
import {BrowserRouter} from "react-router-dom";
let rerenderEntireTree = (store:StoreType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={store.getState()} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)} />
        </BrowserRouter>,
        document.getElementById('root')
    );
};

rerenderEntireTree(store);

store.subscribe(() => {
    rerenderEntireTree(store);
});



reportWebVitals();
