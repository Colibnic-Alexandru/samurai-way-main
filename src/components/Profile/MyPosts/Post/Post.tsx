import React from 'react';
import s from './Post.module.css';
import {PostsType} from "../../../../redux/state";

export const Post = (props: PostsType) => {
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
