import React from "react";

import '../styles/messages.css'

import MessagingUserItem from './MessagingUserItem'

export default class Messages extends React.Component{
    render(){
        return (
            <div className="messages">
                <MessagingUserItem userMail={this.props.userMail} users={this.props.users} openMessagesDisplay={this.props.openMessagesDisplay}/>
            </div>
        )
    }
}