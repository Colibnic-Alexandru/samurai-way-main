import {ActionsType, ProfilePageType} from "./state";

export const profileReducer = (state: ProfilePageType, action: ActionsType) => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 6,
                message: state.newPostText,
                likeCount: 0,
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case 'UPDATE_NEW_POST_TEXT': {
            state.newPostText = action.newText;
            return state;
        }
        default:
            return state;
    }
}