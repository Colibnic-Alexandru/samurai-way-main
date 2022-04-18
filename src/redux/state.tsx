import {profileReducer} from "./reducerProfilePage";
import {dialogsReducer} from "./reducerDialogsPage";

 type PostsType = {
    id: number
    message: string
    likeCount: number
}
 type MessagesType = {
    id: number
    message: string
}
 type DialogsType = {
    id: number
    name: string
}
 type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
 type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
 type RoteStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

type StoreType = {
    _state: RoteStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RoteStateType
    dispatch:(action: any)=> void



}

type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>

 const addPostAC = (postMessage: string) => {
    return {
        type: 'ADD_POST',
        newPostText: postMessage
    } as const
}
 const updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newText:newText
    } as const
}
 const sendMessageAC = (messagesText:string) => {
    return {
        type: 'SEND_MESSAGE',
        messagesText: messagesText
    } as const
}
 const updateNewMessageTextAC = (newBodyText: string) => {
    return {
        type: 'UPDATE_NEW_MESSAGE_TEXT',
        newBodyText:newBodyText
    } as const
}

const store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Alex'},
                {id: 2, name: 'Dima'},
                {id: 3, name: 'Marius'},
                {id: 4, name: 'Nicoleta'},
                {id: 5, name: 'Vlad'},
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'Privet'},
                {id: 3, message: 'Hi'},
                {id: 4, message: 'Yo Yo Yo'},
                {id: 5, message: 'Nuroc'},
            ],
            newMessageText: '',
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hello', likeCount: 25},
                {id: 2, message: 'Hello my friend', likeCount: 27},
                {id: 3, message: 'My name Alex', likeCount: 45},
                {id: 4, message: 'Hi hwo are you?', likeCount: 15},
                {id: 5, message: 'Hello', likeCount: 75},
            ],
            newPostText: '',
        },
    },
    _callSubscriber (){
        console.log('state changed');
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },

    dispatch(action: any) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber();
    },
};



