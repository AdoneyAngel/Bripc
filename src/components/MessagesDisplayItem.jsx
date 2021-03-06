import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import db from './dbConexion'

import '../styles/msg.css'

const date = new Date()

export default function MessagesDisplayItem(props){
    const [chatDocId, setChatDocId] = useState('')
    const [messages, setMessages] = useState([])
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [globalMessages, setGlobalMessages] = useState([])

    let loadChats = async () => {
        setLoadingMessages(true)
        
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
            
            setLoadingMessages(false)
        });
    }

    let loadGlobalChat = async () => {
        const globalChatRef = await getDocs(collection(db, 'globalChat'))
        const chat = globalChatRef.docs[0].data().chat
        const users = await getDocs(collection(db, 'users'))

        let messagesTotal = []

        const userProfile = users.docs.filter(user => user.data().mail == props.mail)[0]

        chat.map(message => {
            let newMessage = {
                name: message.name,
                mail: message.mail,
                message: message.message,
                date: message.date
            }

            messagesTotal.push(newMessage)
        })

        setGlobalMessages(messagesTotal)

        
        const unsub = onSnapshot(doc(db, "globalChat", 'chat'), (doc) => {

            messagesTotal = []

            doc.data().chat.map(message => {
                let newMessage = {
                    name: message.name,
                    mail: message.mail,
                    message: message.message,
                    date: message.date
                }
    
                messagesTotal.push(newMessage)
            })

            setGlobalMessages(messagesTotal)
        });
    }

    useEffect(() => {
        if(!props.openGlobalChat){
            loadChats()
        }else if(props.openGlobalChat){
            loadGlobalChat()
        }
    }, [chatDocId, props.userSel])

    let notification = (txt) => {
        return <div className='msg-notify'><p>{txt}</p></div>
    }
    
    let datesRegistred = []

    return (
        <React.Fragment>
            {

                props.openGlobalChat ? globalMessages.map(message => {

                    return <div className='msgBox'>
                            {message.date.day != date.getDate() && !datesRegistred.includes(message.date.day+'/'+message.date.month+'/'+message.date.year) || message.date.month != date.getMonth()+1 && !datesRegistred.includes(message.date.day+'/'+message.date.month+'/'+message.date.year) || message.date.year != date.getFullYear() && !datesRegistred.includes(message.date.day+'/'+message.date.month+'/'+message.date.year) ? <header className='msg-notify'><p>{message.date.day + '/' + message.date.month}{message.date.year != date.getFullYear() ? '/' + message.date.year : ''}</p><span style={{visibility: 'hidden'}}>{datesRegistred.push(message.date.day+'/'+message.date.month+'/'+message.date.year)}</span></header> : !datesRegistred.includes('Today') && message.date.day == date.getDate() && message.date.month == date.getMonth()+1 && message.date.year == date.getFullYear() ? <header className='msg-notify'><p>Today</p><span style={{visibility: 'hidden'}}>{datesRegistred.push('Today')}</span></header> : null}

                            <div className={message.mail == props.userMail ? 'msg msg-me' : 'msg msg-he'}>
                                    {message.mail != props.userMail ? <p className='msg-user-name'>{message.name}</p> : null}
                                <p className={message.mail == props.userMail ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>
                                    
                                    {message.message}
                                </p>
                                <br />
                                <p className='msg-date'>{message.date.hour + ':' + message.date.minute + (message.date.hour > 12 ? 'pm' : 'am')}</p>
                            </div>                        
                    </div>

                }) :
                messages.length < 1 ? notification(loadingMessages ? '...' : "You don't have messages") : messages.map(message => {
                    return <div className='msgBox'>
                        {message.date.day != date.getDate() && !datesRegistred.includes(message.date.day+'/'+message.date.month+'/'+message.date.year) || message.date.month != date.getMonth()+1 && !datesRegistred.includes(message.date.day+'/'+message.date.month+'/'+message.date.year) || message.date.year != date.getFullYear() && !datesRegistred.includes(message.date.day+'/'+message.date.month+'/'+message.date.year) ? <header className='msg-notify'><p>{message.date.day + '/' + message.date.month}{message.date.year != date.getFullYear() ? '/' + message.date.year : ''}</p><span style={{visibility: 'hidden'}}>{datesRegistred.push(message.date.day+'/'+message.date.month+'/'+message.date.year)}</span></header> : !datesRegistred.includes('Today') && message.date.day == date.getDate() && message.date.month == date.getMonth()+1 && message.date.year == date.getFullYear() ? <header className='msg-notify'><p>Today</p><span style={{visibility: 'hidden'}}>{datesRegistred.push('Today')}</span></header> : null}

                        <div className={message.user == '1' ? 'msg msg-me' : 'msg msg-he'}>

                                    <p className={message.user == '1' ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>{message.txt}</p>
                                    <br />
                                    <p className='msg-date'>{message.date.hour + ':' + message.date.minute + (message.date.hour > 12 ? 'pm' : 'am')}</p>
                        </div>
                    </div> 

                })
            }
        </React.Fragment>
    )
}
//<div className={message.for == 'me' ? 'msg msg-me' : 'msg msg-he'}><p className={message.for == 'me' ? 'msg-txt msg-txt-me' : 'msg-txt msg-txt-he'}>{message.txt}</p></div>