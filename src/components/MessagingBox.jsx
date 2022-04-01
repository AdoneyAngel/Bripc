import React from 'react'

import '../styles/messagingBox.css'

import Messages from './Messages'

export default class MessagingBox extends React.Component{
    render(){
        return (
            <div style={this.props.otherStyles} className='messagingBox'>
                {this.props.openMessagesDisplayValue ? '' : <h1>Messages</h1>}
                <Messages openMessagesDisplayValue={this.props.openMessagesDisplayValue} userMail={this.props.userMail} users={this.props.users} openMessagesDisplay={this.props.openMessagesDisplay}/>
            </div>
        )
    }
}