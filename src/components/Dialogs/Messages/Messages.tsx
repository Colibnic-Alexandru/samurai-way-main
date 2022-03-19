import React from 'react';
import s from "./Messages.module.css";


type MessagesPropsType = {
    message: string
    id: number
}


export const Messages = (props:MessagesPropsType) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}

