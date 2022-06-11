import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Prepoder/Preloader";
import {ProfilePageType} from "../../../redux/reducerProfilePage";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type PropsType = {
    profile: ProfilePageType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props:PropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' alt={''} />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos?.large} alt={''}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
         </div>
    )
}
