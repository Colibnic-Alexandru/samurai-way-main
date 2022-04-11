import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsType, ProfilePageType,} from "../../redux/state";

type MessagePropsType = {
    dispatch: (action: ActionsType) => void
    dataForProfile:ProfilePageType
}

export const Profile = (props: MessagePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
           <MyPosts dataPosts={props.dataForProfile}
                    dispatch={props.dispatch}  />
        </div>
    )
}
