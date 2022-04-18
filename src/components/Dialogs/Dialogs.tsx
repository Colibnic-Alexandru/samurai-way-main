import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Messages} from "./Messages/Messages";
import {DialogsType, MessagesType} from "../../redux/reducerDialogsPage";

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
    sendMessage: (newMessageText: string) => void
    updateNewMessageText: (newMessageText: string) => void
}

export const Dialogs = (props:DialogsPropsType) => {

    const dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    const messagesElements = props.messages.map(m => <Messages message={m.message} id={m.id}/>)

    const onClickHandler = () => {
        props.sendMessage(props.newMessageText)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        props.updateNewMessageText(text)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>{messagesElements}</div>
            <div>
                <div><textarea value={props.newMessageText}
                               placeholder='Enter message'
                               onChange={onChangeHandler}
                /></div>
                <div>
                    <button onClick={onClickHandler}>Send</button>
                </div>
            </div>
        </div>
    );
};

