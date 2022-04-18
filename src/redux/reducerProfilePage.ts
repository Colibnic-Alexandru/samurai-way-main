
export type PostsType = {
    id: number
    message: string
    likeCount: number
}

export type newPostTextType = string

export type InitialStateType = typeof  initialState

const initialState = {
    posts: [
        {id: 1, message: 'Hello', likeCount: 25},
        {id: 2, message: 'Hello my friend', likeCount: 27},
        {id: 3, message: 'My name Alex', likeCount: 45},
        {id: 4, message: 'Hi hwo are you?', likeCount: 15},
        {id: 5, message: 'Hello', likeCount: 75},
    ] as Array<PostsType>,
    newPostText: "" as newPostTextType
};


export const profileReducer = (state: InitialStateType = initialState, action: ActionProfileType):InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 6,
                message: state.newPostText,
                likeCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case 'UPDATE_NEW_POST_TEXT': {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        default:
            return state;
    }
}

type ActionProfileType = ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextAC>

export const addPostAC = (postMessage: string) => {
    return {
        type: 'ADD_POST',
        newPostText: postMessage
    } as const
}
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newText:newText
    } as const
}
