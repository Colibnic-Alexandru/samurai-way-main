
export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}

export type InitialStateType = typeof  initialState

const initialState = {
    dialogs: [
        {id: 1, name: 'Alex'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Marius'},
        {id: 4, name: 'Nicoleta'},
        {id: 5, name: 'Vlad'},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Privet'},
        {id: 3, message: 'Hi'},
        {id: 4, message: 'Yo Yo Yo'},
        {id: 5, message: 'Nuroc'},
    ] as Array<MessagesType>,
    newMessageText: '' as string

}


export const dialogsReducer = (state:InitialStateType  = initialState, action: ActionDialogType):InitialStateType => {

    switch (action.type) {
        case 'SEND_MESSAGE':
            let body = state.newMessageText;
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: 6, message: body}]
            };
        case'UPDATE_NEW_MESSAGE_TEXT': {
            return  {...state, newMessageText: action.newBodyText}
        }
        default:
            return state;
    }

}

type ActionDialogType = ReturnType<typeof sendMessageAC> | ReturnType<typeof updateNewMessageTextAC>

export const sendMessageAC = (messagesText:string) => {
    return {
        type: 'SEND_MESSAGE',
        messagesText: messagesText
    } as const
}
export const updateNewMessageTextAC = (newBodyText: string) => {
    return {
        type: 'UPDATE_NEW_MESSAGE_TEXT',
        newBodyText:newBodyText
    } as const
}
