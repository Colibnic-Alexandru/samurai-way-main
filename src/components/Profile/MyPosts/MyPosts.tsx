import React from 'react';
import s from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsType} from "../../../redux/reducerProfilePage";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validarors/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


type MyPostsPropsType = {
    posts: Array<PostsType>
    addPost: (newPostText: string) => void
}

type FormDataType = {
    newMessageText: string
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postsElement = props.posts.map(p => <Post id={p.id} message={p.message} likeCount={p.likeCount}/>)

    const addFormPost = (formData: FormDataType) => {
        props.addPost(formData.newMessageText)
        console.log(formData.newMessageText)
    }

    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <AddPostReduxForm onSubmit={addFormPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

const maxLength = maxLengthCreator(10)

export const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} name={'newMessageText'}
                        placeholder={'Enter message'}
                        validate={[required, maxLength]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<FormDataType>({form: 'dialogAddPostForm'})(AddPostForm)