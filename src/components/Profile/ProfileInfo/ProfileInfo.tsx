import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Prepoder/Preloader";
import {ProfilePageType} from "../../../redux/reducerProfilePage";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.jpg"

type PropsType = {
    profile: ProfilePageType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: string) => void
}

export const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: { target: any }) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                    alt={''}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos?.large || userPhoto} className={s.mainPhoto} alt={''}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}
