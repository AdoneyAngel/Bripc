import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import React from 'react'

import '../styles/messagingUserItem.css'
import db from './dbConexion'

export default class MessagingUserItem extends React.Component{

    state = {
        users: [],
        haveMessage: 'loading',
        loading: true
    }

    loadThisUsersChat = async () => {

            const unsub = onSnapshot(collection(db, "chats"), (doc) => {
                    
                let users = []

                const chats = doc

                for(let chat in chats.docs){
                    if(chats.docs[chat].data().user1 == this.props.userMail){
                        users.push(chats.docs[chat].data().user2)
                    }
                }

                this.setState({
                    users: users,
                    loading: false
                })
            })
    }

    componentElementErr = txt => {
        return <div 
        name='user-btn'
        key='0' 
        onClick='none' 
        className='messagingUserItem user-message-err'>{txt}</div>
    }

    componentDidMount(){
        this.loadThisUsersChat()
    }

    render(){
        return (
            <React.Fragment>
                {
                    this.state.loading ? this.componentElementErr('Loading...') : this.state.users.length > 0 ?this.state.users.map(user => {
                        return <div 
                        name='user-btn'
                        key={user} 
                        onClick={this.props.openMessagesDisplay} 
                        className='messagingUserItem'>{user}</div>
                    }) : this.componentElementErr('You do not have chats')
                }
            </React.Fragment>

                /*this.props.users.map(user => {
                    return <div key={user.id} onClick={this.props.openMessagesDisplay.bind("${user.name}")} className='messagingUserItem'>{user.name}</div>
                })*/
        )
    }
}