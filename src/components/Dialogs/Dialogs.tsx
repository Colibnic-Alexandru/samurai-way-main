import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Messages} from "./Messages/Messages";
import {DialogsType, MessagesType} from "../../redux/reducerDialogsPage";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    sendMessage: (newMessageText: string) => void
}

type FormDataType = {
    newMessageText: string
}

export const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    const messagesElements = props.messages.map(m => <Messages message={m.message} id={m.id}/>)

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


const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={'textarea'} name={'newMessageText'} placeholder={'Enter message'}/></div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)