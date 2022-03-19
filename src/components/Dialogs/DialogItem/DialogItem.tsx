import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './DialogsItem.module.css';
import {DialogsType} from "../../../redux/state";


export const DialogItem = (props:DialogsType) => {
    let path = "/dialog/" + props.id
    return (
        <div className={s.dialogs}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

