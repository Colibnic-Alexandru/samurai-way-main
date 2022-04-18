import React from 'react';
import s from './Post.module.css';

type PropsType = {
    id:number
    message: string
    likeCount:number
}


export const Post = (props:PropsType) => {
    return (
        <div className={s.item}>
            <img src="https://vraki.net/sites/default/files/inline/images/10_342.jpg" />
            { props.message }
            <div>
                <span>like</span> { props.likeCount }
            </div>
        </div>
    )
}
