import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type MessagePropsType ={
    dataForMessages: ProfilePageType
    addPost:(postMessage: string)=> void
    updateNewPostText:(newText: string)=> void
}

export const Profile = (props:MessagePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts addPosts={props.dataForMessages}
                     addPost={props.addPost}
                     newPostText={props.dataForMessages.newPostText}
                     updateNewPostText={props.updateNewPostText}
            />
        </div>
    )
}
