import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/reduxStore";
import {DialogsType, MessagesType, sendMessageAC, updateNewMessageTextAC,} from "../../redux/reducerDialogsPage";
import {Dispatch} from "redux";

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
    isAuth: boolean
}
type MapDispatchPropsType = {
    sendMessage: (newMessageText: string) => void
    updateNewMessageText: (newMessageText: string) => void
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        sendMessage: (newMessageText: string) => {
            dispatch(sendMessageAC(newMessageText))
        },
        updateNewMessageText: (newMessageText: string) => {
            dispatch(updateNewMessageTextAC(newMessageText))
        }
    }
}

export const DialogContainer = connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,mapDispatchToProps)(Dialogs);