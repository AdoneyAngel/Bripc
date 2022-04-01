import React from "react";

import '../styles/messages.css'

import MessagingUserItem from './MessagingUserItem'

export default class Messages extends React.Component{
    render(){
        let styles = {
            borderRadius: [this.props.openMessagesDisplayValue ? '0' : '15px'],
            boxShadow: [this.props.openMessagesDisplayValue ? '0px 0px 0px 0px #00000026' : '0px 0px 5px 0px #00000026'],
            textAlign: [this.props.openMessagesDisplayValue ? 'center' : 'left']
        }

        let openMessagesDisplay = this.props.openMessagesDisplayValue ? '' : this.props.openMessagesDisplay
        return (
            <div style={styles} className="messages">
                <MessagingUserItem setUserSel={this.props.setUserSel} userMail={this.props.userMail} users={this.props.users} openMessagesDisplay={openMessagesDisplay}/>
            </div>
        )
    }
}