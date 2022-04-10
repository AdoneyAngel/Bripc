import React, { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import db from './dbConexion'

import '../styles/msg.css'

export default function MessagesDisplayItem(props){
    const [messages, setMessages] = useState([])

    let loadUserMessages = new Promise((resolve, reject) => {
        const loadChats = async () => {
            const chats = await getDocs(collection(db, 'chats'))

            const unsub = onSnapshot(collection(db, "chats"), (doc) => {
                let messagesLoaded = doc.docs.filter(chat => chat.data().user2 == props.userSel && chat.data().user1 == props.userMail)

                loadMessages(messagesLoaded[0].data())
            });       
        }

        loadChats()

    })

    let loadMessages = (messages) => {
            let messagesLoaded = []

            messages.messages.map(re => {
                if(re.user == 1){
                    let newMessage = {
                        user: 'me',
                        txt: re.txt,
                        date: re.date
                    }

                    messagesLoaded.push(newMessage)
                }else{
                    let newMessage = {
                        user: 'he',
                        txt: re.txt,
                        date: re.date
                    }

                    messagesLoaded.push(newMessage)
                }

                setTimeout(() => {
                    setMessages(messagesLoaded)
                }, 1000)

                
            })
    }

    useEffect(() => {
    }, [messages])
    return (
        <React.Fragment>
            {
                messages.map(message => {
                    return <div className={message.user == 'me' ? 'msg msg-me' : 'msg msg-he'}><p className={message.user == 'me' ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>{message.txt}</p></div>
                })
            }
        </React.Fragment>
    )
}
//<div className={message.for == 'me' ? 'msg msg-me' : 'msg msg-he'}><p className={message.for == 'me' ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>{message.txt}</p></div>