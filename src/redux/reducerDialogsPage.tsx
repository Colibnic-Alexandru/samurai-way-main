import {ActionsType, DialogsPageType} from "./state";

export const dialogsReducer = (state: DialogsPageType, action: ActionsType) => {

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