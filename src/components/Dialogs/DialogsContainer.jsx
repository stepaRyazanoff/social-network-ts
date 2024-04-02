import React from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import Dialogs from "./Dialogs"
import {sendMessage} from "../../redux/dialogsReducer"

class DialogsContainer extends React.Component {
    sendMessage(messageText) {
        this.props.sendMessage(messageText)
    }

    render() {
        return (
            <Dialogs dialogs={this.props.dialogs}
                     messages={this.props.messages}
                     messageText={this.props.messageText}
                     sendMessage={this.sendMessage.bind(this)}
            />
        )
    }
}

const mapStateToProps = state => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
})

export default compose(
    connect(
        mapStateToProps,
        {
            sendMessage,
        }))(DialogsContainer)