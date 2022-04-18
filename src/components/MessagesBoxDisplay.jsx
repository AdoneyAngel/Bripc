import React from 'react'
import { collection, getDocs, updateDoc, doc, addDoc, setDoc } from "firebase/firestore";
import db from './dbConexion'

import '../styles/messagesBoxDisplay.css'

import Display from './MessagesDisplay'
import TextField from './MessagingTextField'
import back from '../icons/back2.png'

export default class MessagesBoxDisplay extends React.Component{

    styles = () => {
        return ({
            left: this.props.open ? '200px' : this.props.openGlobalChat ? '0px' : '100%',
            animation: !this.props.openGlobalChat ? 'openDisplay 0.2s ease' : 'openDisplayGlobalChat 0.2s ease',
            width: this.props.openGlobalChat ? '100%' : 'calc(100% - 200px)'
        })
    }

    state = {
        message: ''
    }

    sendMessage = (message) => {
        const date = new Date()
        
        const dateNow = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            minute: date.getMinutes(),
            hour: date.getHours()
        }

        let sendMessage = new Promise((resolve, reject) => {
            const loadIdDoc = async () => {
                const usersDocs = await getDocs(collection(db, 'chats'))
                
                const userDoc = usersDocs.docs.filter(user => user.data().user1 == this.props.userMail && user.data().user2 == this.props.userSel)[0]
                let chatUset1 = usersDocs.docs.filter(user => user.data().user1 == this.props.userMail && user.data().user2 == this.props.userSel)[0].data().messages


                let newMessageUser1 = {
                    date: dateNow,
                    txt: message,
                    user: 1
                }
    
                let newMessageUser2 = {
                    date: dateNow,
                    txt: message,
                    user: 2
                }

                let createNewDocUser2 = async () => {
                    const docRef = await addDoc(collection(db, "chats"), {
                        user1: this.props.userSel,
                        user2: this.props.userMail,
                        messages: [newMessageUser2]
                    });

                }

                if(!usersDocs.docs.filter(user => user.data().user1 == this.props.userSel && user.data().user2 == this.props.userMail)[0]){
                    createNewDocUser2()
                    console.log('el documento de la otra persona no esta creada...')
                }
                if(usersDocs.docs.filter(user => user.data().user1 == this.props.userMail && user.data().user2 == this.props.userSel)[0].data().messages.length < 1){
                    chatUset1 = [newMessageUser1]
                }
    
                const userChatDoc = usersDocs.docs.filter(user => user.data().user1 == this.props.userSel && user.data().user2 == this.props.userMail)[0]
                let chatUset2 = usersDocs.docs.filter(user => user.data().user1 == this.props.userSel && user.data().user2 == this.props.userMail)[0].data().messages
    
                //Actualizar documento

                chatUset1.push(newMessageUser1)
                chatUset2.push(newMessageUser2)

                console.log(chatUset1)

                const userChat1Ref = doc(db, "chats", userDoc.id);
                await updateDoc(userChat1Ref, {
                  messages: chatUset1
                });

                const userChat2Ref = doc(db, "chats", userChatDoc.id);
                await updateDoc(userChat2Ref, {
                  messages: chatUset2
                });
    
                resolve(true)
            }    
            
            loadIdDoc()
        })

        sendMessage.then(res => {
        })

        document.querySelector('.messagesDisplay').scrollTop = 9999999
    
    }

    sendGlobalMessage = async (message) => {

        const date = new Date()
        
        const dateNow = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            minute: date.getMinutes(),
            hour: date.getHours()
        }

        const users = await getDocs(collection(db, 'users'))
        const userProfile = users.docs.filter(user => user.data().mail == this.props.userMail)[0]


        const globalChatRef = await getDocs(collection(db, 'globalChat'))
        const chat = globalChatRef.docs[0].data().chat

        let newMessage = {
            name: userProfile.data().name,
            mail: this.props.userMail,
            message: message,
            date: dateNow
        }

        chat.push(newMessage)

        await setDoc(doc(db, "globalChat", "chat"), {chat});

        document.querySelector('.messagesDisplay').scrollTop = 9999999
    }

    componentDidMount(){
        setTimeout(()=>document.querySelector('.messagesDisplay').scrollTop = 9999999, 300)
    }

    render(){
        let superiorBarStyles = {
            zIndex: '1'
        }

        return (
            <div style={this.styles()} className='messagesBoxDisplay'>
                <div className='superiorBar'>
                    <button onClick={this.props.close} style={{"zIndex":" 4"}}><img src={back}/></button>
                    <h1 style={superiorBarStyles}>{!this.props.openGlobalChat ? this.props.userNameSel : 'Global'}</h1>
                </div>
                <Display openGlobalChat={this.props.openGlobalChat} userMail={this.props.userMail} userSel={this.props.userSel} reloadMessages={this.props.reloadMessages} loadMessages={this.props.loadMessages}/>
                <TextField sendMessage={!this.props.openGlobalChat ? this.sendMessage : this.sendGlobalMessage} />
            </div>
        )
    }
}