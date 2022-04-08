import React from 'react';
import s from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ProfilePageType} from "../../../redux/state";


type MyPostsPropsType ={
    addPosts: ProfilePageType
    addPost: (postMessage: string)=> void
    newPostText: string
    updateNewPostText: (newText: string)=> void
}

export const MyPosts = (props:MyPostsPropsType) => {

    const postsElement = props.addPosts.posts.map(p=> <Post id={p.id} message={p.message} likeCount={p.likeCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        if (newPostElement.current){
            const text = newPostElement.current.value
            props.addPost(text)
        }
    }

    const onPostChange = () => {
        if (newPostElement.current){
            const text = newPostElement.current.value
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <div>
                <div><textarea
                    ref={newPostElement}
                    value={props.newPostText}
                    onChange={onPostChange}
                ></textarea></div>
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

