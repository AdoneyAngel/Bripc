import React from 'react'

import '../styles/messagesDisplay.css'

import MessagesDisplayItem from './MessagesDisplayItem'

export default class MessagesDisplay extends React.Component{

    render(){
        setTimeout(()=>document.querySelector('.messagesDisplay').scrollTop = 999999, 100)
        return (
            <div className='messagesDisplay'>
                <br />
                <MessagesDisplayItem userSel={this.props.userSel} reloadMessages={this.props.reloadMessages} userMail={this.props.userMail} loadMessages={this.props.loadMessages}/>
            </div>
        )
    }
}