import React from 'react';
import s from './Dialogs.module.css';
import { DialogItem } from './DialogItem/DialogItem';
import {Messages} from "./Messages/Messages";
import {DialogsPageType} from "../../redux/state";

type DialogsPropsType = {
    dataForDialogs: DialogsPageType
}

export const Dialogs = (props:DialogsPropsType) => {

    const dialogsElements = props.dataForDialogs.dialogs.map(d => <DialogItem name={d.name} id={d.id}/> )

    const messagesElements = props.dataForDialogs.messages.map(m => <Messages message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
            </div>
        </div>
    );
};

