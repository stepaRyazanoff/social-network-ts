import React, {ComponentType} from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import Dialogs from "./Dialogs"
import {actions, Messages, DialogsType} from "../../redux/dialogsReducer"
import {RootState} from "../../redux/redux-store"

interface StateProps {
    dialogs: DialogsType[]
    messages: Messages[]
}

interface DispatchProps {
    sendMessage: (messageText: string) => void
}

class DialogsContainer extends React.Component<StateProps & DispatchProps> {
    sendMessage(messageText: string) {
        this.props.sendMessage(messageText)
    }

    render() {
        return (
            <Dialogs dialogs={this.props.dialogs}
                     messages={this.props.messages}
                     sendMessage={this.sendMessage.bind(this)}/>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
})

export default compose<ComponentType>(
    connect<StateProps, DispatchProps, unknown, RootState>(
        mapStateToProps,
        {
            sendMessage: actions.sendMessage,
        }))(DialogsContainer)