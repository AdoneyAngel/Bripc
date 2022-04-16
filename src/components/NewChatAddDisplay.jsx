import React from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from './dbConexion'

import '../styles/newChatAddDisplay.css'

import plusIcon from '../icons/plus.png'

export default class NewChatAddDisplay extends React.Component{

    state = {
        friendsToAdd: []
    }

    loadFriendsToAdd = new Promise((resolve, reject) => {
        let friendsChats = []
        let userFriends
        let friendsToAdd = []

        let loadChats = async () => {
            const chats = await getDocs(collection(db, 'chats'))
            let userChats = chats.docs.filter(chat => chat.data().user1 == this.props.userMail)

            userChats.map(user => friendsChats.push(user.data().user2))
            let loadFriends = async () => {
                const users = await getDocs(collection(db, 'users'))
                const userProfile = users.docs.filter(user => user.data().mail == this.props.userMail)[0].data()
    
                userFriends = userProfile.friends
    
                userFriends.map(friend => {
                    if(!friendsChats.includes(friend)){
                        let newFriend = {
                            name: users.docs.filter(user => user.data().mail == friend)[0].data().name,
                            mail: friend
                        }
                        friendsToAdd.push(newFriend)
                    } 
                })
    
                this.setState({
                    friendsToAdd
                })
    
                resolve(true)
            }
    
            loadFriends()
        }
        
        loadChats()

    })

    newChat = async (userMail) => {
        const docRef = await addDoc(collection(db, "chats"), {
            user1: this.props.userMail,
            user2: userMail,
            messages: []
        });
    }

    render(){
        let styles = {
            animation: 'openDisplayRight 0.2s linear'
        }
        return (
            <div style={styles} className="newChatAddDisplay">
                <h1>Friends</h1>
                {
                    this.state.friendsToAdd.map(friend => {
                        return <div>
                            <p>{friend.name}</p>
                            <button onClick={() => {
                                this.newChat(friend.mail)
                            }}><img src={plusIcon}/></button>
                        </div>
                    })
                }
            </div>
        )
    }
}