import React from 'react';
import s from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ProfilePageType} from "../../../redux/state";


type MyPostsPropsType ={
    addPosts: ProfilePageType
}

export const MyPosts = (props:MyPostsPropsType) => {

    const postsElement = props.addPosts.posts.map(p=> <Post id={p.id}message={p.message} likeCount={p.likeCount}/>)

    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <div>
                <div><textarea></textarea></div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

