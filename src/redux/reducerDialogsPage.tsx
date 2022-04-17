import {ActionsType, DialogsPageType} from "./state";

const initialState = {
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

}


export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType) => {

    switch (action.type) {
        case 'SEND_MESSAGE':
            let newMessage = {
                id: 6,
                message: state.newMessageText,
            };
            state.messages.push(newMessage);
            state.newMessageText = '';
            return state;
        case'UPDATE_NEW_MESSAGE_TEXT': {
            state.newMessageText = action.newBodyText;
            return state;
        }
        default:
            return state;
    }

}