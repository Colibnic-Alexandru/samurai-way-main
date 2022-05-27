export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}

export type InitialStateType = typeof initialState

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

}


export const dialogsReducer = (state: InitialStateType = initialState, action: ActionDialogType): InitialStateType => {

    switch (action.type) {
        case 'SEND_MESSAGE':
            let body = action.messagesText;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

type ActionDialogType = ReturnType<typeof sendMessageAC>

export const sendMessageAC = (newMessageText: string) => {
    return {
        type: 'SEND_MESSAGE',
        messagesText: newMessageText,
    } as const
}
