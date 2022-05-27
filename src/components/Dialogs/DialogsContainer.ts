import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/reduxStore";
import {DialogsType, MessagesType, sendMessageAC, updateNewMessageTextAC,} from "../../redux/reducerDialogsPage";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {ComponentType} from "react";

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
type MapDispatchPropsType = {
    sendMessage: (newMessageText: string) => void
    updateNewMessageText: (newMessageText: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageText: string) => {
            dispatch(sendMessageAC(newMessageText))
        },
        updateNewMessageText: (newMessageText: string) => {
            dispatch(updateNewMessageTextAC(newMessageText))
        }
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)