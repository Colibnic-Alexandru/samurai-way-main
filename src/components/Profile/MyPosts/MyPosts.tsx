import React from 'react';
import s from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ActionsType, addPostAC, ProfilePageType, updateNewPostTextAC} from "../../../redux/state";


type MyPostsPropsType = {
    dataPosts: ProfilePageType
    dispatch:(action:ActionsType)=>void
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postsElement = props.dataPosts.posts.map(p => <Post id={p.id} message={p.message} likeCount={p.likeCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        if (newPostElement.current) {
            const text = newPostElement.current.value
            props.dispatch(addPostAC(text))
        }
    }

    const onPostChange = () => {
        if (newPostElement.current) {
            const text = newPostElement.current.value
            props.dispatch(updateNewPostTextAC(text))
        }
    }

    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <div>
                <div><textarea
                    ref={newPostElement}
                    value={props.dataPosts.newPostText}
                    onChange={onPostChange}
                /></div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}
