import React from 'react'
import { collection, getDocs, updateDoc, doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import db from './dbConexion'

import '../styles/messagesBoxDisplay.css'

import Display from './MessagesDisplay'
import TextField from './MessagingTextField'
import MiniDisplay from './MiniDisplay';

import back from '../icons/back2.png'
import settingIcon from '../icons/settings.png'
import { get } from 'firebase/database';

export default class MessagesBoxDisplay extends React.Component{

    styles = () => {
        return ({
            left: this.props.open ? '200px' : this.props.openGlobalChat ? '0px' : '100%',
            animation: !this.props.openGlobalChat ? 'openDisplay 0.2s ease' : 'openDisplayGlobalChat 0.2s ease',
            width: this.props.openGlobalChat ? '100%' : 'calc(100% - 200px)'
        })
    }

    state = {
        message: '',
        openChatSettings: false
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
                let chatUset2

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

                if(!usersDocs.docs.filter(user => user.data().user1 == this.props.userSel && user.data().user2 == this.props.userMail)[0]){
                    const docRef = await addDoc(collection(db, "chats"), {
                        user1: this.props.userSel,
                        user2: this.props.userMail,
                        messages: [newMessageUser2]
                    });
                }else{
                    chatUset2 = usersDocs.docs.filter(user => user.data().user1 == this.props.userSel && user.data().user2 == this.props.userMail)[0].data().messages
                }
                if(usersDocs.docs.filter(user => user.data().user1 == this.props.userMail && user.data().user2 == this.props.userSel)[0].data().messages.length < 1){
                    chatUset1 = [newMessageUser1]
                }
    
                const userChatDoc = usersDocs.docs.filter(user => user.data().user1 == this.props.userSel && user.data().user2 == this.props.userMail)[0]
    
                //Actualizar documento

                chatUset1.push(newMessageUser1)

                const userChat1Ref = doc(db, "chats", userDoc.id);
                await updateDoc(userChat1Ref, {
                  messages: chatUset1
                });

                if(chatUset2){
                    chatUset2.push(newMessageUser2)
                    
                    const userChat2Ref = doc(db, "chats", userChatDoc.id);
                    await updateDoc(userChat2Ref, {
                    messages: chatUset2
                    });
                }

    
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

    deleteChat = async () => {
        const chats = await getDocs(collection(db, 'chats'))

        const chatRef = chats.docs.filter(chat => chat.data().user1 == this.props.userMail && chat.data().user2 == this.props.userSel)[0].id

        await deleteDoc(doc(db, 'chats', chatRef))
        
        this.props.close()
    }

    openChatSettings = () => {
        this.setState({
            openChatSettings: !this.state.openChatSettings
        })
    }

    render(){
        let superiorBarStyles = {
            zIndex: '1'
        }

        const settingsButtons = [
            {
                hover: 'grey',
                value: 'Profile',
                click: ()=>{}
            },
            {
                hover: 'red',
                value: 'Delete chat',
                click: this.deleteChat
            }
        ]

        return (
            <div style={this.styles()} className='messagesBoxDisplay'>
                <div className='superiorBar'>
                    <button className='btn-back' onClick={this.props.close} style={{"zIndex":" 4"}}><img src={back}/></button>
                    <h1 style={superiorBarStyles}>{!this.props.openGlobalChat ? this.props.userNameSel : 'Global'}</h1>
                    <button onClick={()=>this.openChatSettings()} className='btn-settingChat'><img src={settingIcon} alt="" /></button>
                    {this.state.openChatSettings ? <MiniDisplay buttons={settingsButtons} elementsIsButton={true} elements={settingsButtons} buttonImage='f' button={true} buttonType='text' text={false} buttonFromElements={true} buttonValue='f'/> : null}
                </div>
                <Display openGlobalChat={this.props.openGlobalChat} userMail={this.props.userMail} userSel={this.props.userSel} reloadMessages={this.props.reloadMessages} loadMessages={this.props.loadMessages}/>
                <TextField sendMessage={!this.props.openGlobalChat ? this.sendMessage : this.sendGlobalMessage} />
            </div>
        )
    }
}