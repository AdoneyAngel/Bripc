import React from 'react'

import '../styles/messagingBox.css'

import Messages from './Messages'
import NewChatBtn from './NewChatBtn';

export default class MessagingBox extends React.Component{
    render(){
        return (
            <div style={this.props.otherStyles} className='messagingBox'>
                {this.props.openMessagesDisplayValue ? '' : <h1>Messages</h1>}
                <Messages setUserSel={this.props.setUserSel} openMessagesDisplayValue={this.props.openMessagesDisplayValue} userMail={this.props.userMail} loadUsersChat={this.props.loadUsersChat} openMessagesDisplay={this.props.openMessagesDisplay}/>
                {!this.props.openMessagesDisplayValue ? <NewChatBtn callback={this.props.openNewChatAddDisplay}/> : null}
                
            </div>
        )
    }
}