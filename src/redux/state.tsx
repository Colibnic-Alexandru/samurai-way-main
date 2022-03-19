export type PostsType ={
    id:number
    message: string
    likeCount: number
}
export type MessagesType ={
    id: number
    message: string
}
export type DialogsType ={
    id: number
    name: string
}
export type ProfilePageType = {
    posts: Array<PostsType>
}
export type DialogsPageType ={
    dialogs:Array<DialogsType>
    messages:Array<MessagesType>
}
export type RoteStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

export const state: RoteStateType = {
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
    },
    profilePage: {
        posts: [
            { id: 1, message: 'Hello' , likeCount: 25 },
            { id: 2, message: 'Hello my friend' , likeCount: 27 },
            { id: 3, message: 'My name Alex' , likeCount: 45 },
            { id: 4, message: 'Hi hwo are you?' , likeCount: 15 },
            { id: 5, message: 'Hello' , likeCount: 75 },
        ],
    },
}
