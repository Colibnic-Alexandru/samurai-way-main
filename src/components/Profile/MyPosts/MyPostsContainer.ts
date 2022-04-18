import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/reduxStore";
import {addPostAC, PostsType, updateNewPostTextAC} from "../../../redux/reducerProfilePage";
import {Dispatch} from "redux";

type MapStatePropsType = {
    posts: Array<PostsType>
    newPostText: string
}

type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
    updateNewPostText: (newText: string) => void
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText

    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        },
        updateNewPostText: (newText: string) => {
            dispatch(updateNewPostTextAC(newText))
        }
    }
}

export const MyPostsContainer = connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);