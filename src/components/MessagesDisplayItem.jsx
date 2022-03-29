import React from 'react'

import '../styles/messagesDisplayItem.css'

export default class MessagesDisplayItem extends React.Component{
    render(){
        return (
            <React.Fragment>
                {
                    this.props.messages.message.map((message) => {
                        return <p className='messagesDisplayItem' key={message}>{message}</p>
                    })
                }
            </React.Fragment>
        )
    }
}