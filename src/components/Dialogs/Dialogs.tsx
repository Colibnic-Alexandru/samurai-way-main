import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Messages} from "./Messages/Messages";
import {DialogsType, MessagesType} from "../../redux/reducerDialogsPage";
import {AddMessageReduxForm, FormDataType} from "./AddMessageForm/AddMessageForm";

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    sendMessage: (newMessageText: string) => void
}


export const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)

    const messagesElements = props.messages.map(m => <Messages key={m.id} message={m.message} id={m.id}/>)

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>{messagesElements}</div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    );
};

