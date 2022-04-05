import React, { useEffect, useState } from 'react'

import '../styles/msg.css'

export default function MessagesDisplayItem(props){
    const [messages, setMessages] = useState([])

    useEffect(() => {
        let messagesThis = []
        for(let a = 0; a<props.messages.length; a++){
            let newMessage = {
                "txt":props.messages[a].txt,
                "for":props.messages[a].for,
                "date":props.messages[a].date
            }
        
            messagesThis.push(newMessage)
        }

        setMessages(messagesThis)
    }, [])
    return (
        <React.Fragment>
            {messages.map(message => {
                return <div className={message.for == 'me' ? 'msg msg-me' : 'msg msg-he'}><p className={message.for == 'me' ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>{message.txt}</p></div>
            })}
        </React.Fragment>
    )
}