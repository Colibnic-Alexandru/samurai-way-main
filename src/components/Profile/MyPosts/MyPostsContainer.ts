import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/reduxStore";
import {addPostAC, PostsType} from "../../../redux/reducerProfilePage";
import {Dispatch} from "redux";

type MapStatePropsType = {
    posts: Array<PostsType>
}

type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        },
    }
}

export const MyPostsContainer = connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);