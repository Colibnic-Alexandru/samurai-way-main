import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type MessagePropsType ={
    dataForMessages: ProfilePageType
}

export const Profile = (props:MessagePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts addPosts={props.dataForMessages} />
        </div>
    )
}
