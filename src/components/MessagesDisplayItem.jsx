import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import db from './dbConexion'

import '../styles/msg.css'

export default function MessagesDisplayItem(props){
    const [chatDocId, setChatDocId] = useState('')
    const [messages, setMessages] = useState([])

    let loadChats = async () => {
        const chatsDocs = await getDocs(collection(db, 'chats'))

        let userChats
        
        chatsDocs.docs.map(chat =>{
            if(chat.data().user1 == props.userMail && chat.data().user2 == props.userSel){
                userChats = chat.data().messages
                setChatDocId(chat.id)
                
            }
        })
        const unsub = onSnapshot(doc(db, "chats", chatDocId), (doc) => {
            setMessages(doc.data().messages)
        });
    }


    useEffect(() => {
        loadChats()
    }, [chatDocId, props.userSel])
    return (
        <React.Fragment>
            {
                messages.map(message => {
                    console.log(message)
                    return <div className={message.user == '1' ? 'msg msg-me' : 'msg msg-he'}>
                                <p className={message.user == '1' ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>{message.txt}</p>
                                <br />
                                <p className='msg-date'>{message.date.hour + ':' + message.date.minute + (message.date.hour > 12 ? 'pm' : 'am')}</p>
                            </div>
                })
            }
        </React.Fragment>
    )
}
//<div className={message.for == 'me' ? 'msg msg-me' : 'msg msg-he'}><p className={message.for == 'me' ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>{message.txt}</p></div>