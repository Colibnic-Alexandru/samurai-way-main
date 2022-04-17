import {ActionsType, ProfilePageType} from "./state";


const initialState = {
    posts: [
        {id: 1, message: 'Hello', likeCount: 25},
        {id: 2, message: 'Hello my friend', likeCount: 27},
        {id: 3, message: 'My name Alex', likeCount: 45},
        {id: 4, message: 'Hi hwo are you?', likeCount: 15},
        {id: 5, message: 'Hello', likeCount: 75},
    ],
    newPostText: '',
};


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {
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