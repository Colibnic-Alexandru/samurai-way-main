import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Messages} from "./Messages/Messages";
import {
    ActionsType, DialogsPageType, sendMessageAC, updateNewMessageTextAC,
} from "../../redux/state";

type DialogsPropsType = {
    dataForDialogs: DialogsPageType
    dispatch: (action: ActionsType) => void
}

export const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dataForDialogs.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    const messagesElements = props.dataForDialogs.messages.map(m => <Messages message={m.message} id={m.id}/>)

    const onClickHandler = () => {
        props.dispatch(sendMessageAC(''))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        props.dispatch(updateNewMessageTextAC(text))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>{messagesElements}</div>
            <div>
                <div><textarea value={props.dataForDialogs.newMessageText}
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

