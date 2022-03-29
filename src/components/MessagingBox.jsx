import React from 'react'

import '../styles/messagingBox.css'

import Messages from './Messages'

export default class MessagingBox extends React.Component{
    render(){
        return (
            <div style={this.props.otherStyles} className='messagingBox'>
                <h1>Messages</h1>
                <Messages userMail={this.props.userMail} users={this.props.users} openMessagesDisplay={this.props.openMessagesDisplay}/>
            </div>
        )
    }
}