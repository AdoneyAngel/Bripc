import React from 'react'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import db from './dbConexion'

import '../styles/home.css'

import usersJSON from "../users.json"

import SuperiorBar from './SuperiorBar'
import MessagingBox from './MessagingBox'
import MessagesBoxDisplay from './MessagesBoxDisplay'
import AddFrendsDisplay from './AddFriendsDisplay';
import NewChatAddDisplay from './NewChatAddDisplay';

let userDocId

export default class Home extends React.Component{

    state = {
        openMessagesDisplay: false,
        users: usersJSON,
        userName: this.props.userNameCookie,
        userSelElem: false,
        userSel: '',
        userNameSel: '',
        openDisplaySettingValue: false,
        openDisplayFriendsValue: false,
        openDisplayAddFriendsValue: false,
        openNewChatToAddDisplay: false,
        userFriends: [],
        openGlobalChat: false
    }

    setUserSel = e => {
        if(this.state.userSelElem){
            this.state.userSelElem.className = this.state.userSelElem.className.replace('messagingUserItemSelect', 'messagingUserItemUnselect')
        }

        this.setState({
            userSelElem: e.target,
            userSel: e.target.innerText
        })

        e.target.className = e.target.className.replace('messagingUserItemUnselect', '')
        e.target.className = e.target.className + ' messagingUserItemSelect'

        this.getUserSelName(e.target.innerText)
    }

    openMessagesDisplay = e => {
        if(!this.state.openMessagesDisplay){
            this.setUserSel(e)
        }else{
            this.state.userSelElem.className = this.state.userSelElem.className.replace('messagingUserItemSelect', 'messagingUserItemUnselect')
        }
        

        this.setState({
            openMessagesDisplay: !this.state.openGlobalChat ?  !this.state.openMessagesDisplay : false,
            openGlobalChat: false
        }, () => {
            this.getUserSelName(this.state.userSel)
        })
    }

    getUserSelName = (userMail) => {
        const loadUsers = new Promise((resolve, reject) => {
            const load = async () => {
                const users = await getDocs(collection(db, 'users'))

                users.docs.map(user => {
                    user.data().mail == userMail ? resolve(user.data().name) : console.log('')
                })
            }
            
            load()
        })

        loadUsers.then(res => {
            this.setState({
                userNameSel: res
            })
        })
    }

    openDisplaySetting = () => {
        this.setState({
            openDisplaySettingValue: !this.state.openDisplaySettingValue
        })
    }

    openDisplayFriends = () => {
        this.setState({
            openDisplayFriendsValue: !this.state.openDisplayFriendsValue
        })
    }

    openDisplayAddFriends = () => {
        this.setState({
            openDisplayAddFriendsValue: !this.state.openDisplayAddFriendsValue
        })
    }

    openNewChatAddDisplay = () => {
        this.setState({
            openNewChatToAddDisplay: !this.state.openNewChatToAddDisplay
        })
    }

    closeDisplays = (e) => {
       this.state.openDisplaySettingValue ? this.openDisplaySetting() : console.log('')
       if(e.target.className != 'friendsMiniDisplay' && this.state.openDisplayFriendsValue){
            this.openDisplayFriends()
       }
       if(e.target.className != 'newChatAddDisplay' && this.state.openNewChatToAddDisplay){
        this.openNewChatAddDisplay()
       }
    }

    addFriend = (userToAdd) => {

        let friendsLoaded = []

        let userMailToAdd

        //cargar mail del usuario
        const loadMailUserAdd = async () => {
            let userFriends = this.state.userFriends
            const users = await getDocs(collection(db, 'users'))

            users.docs.map(user => {
                if(user.data().name == userToAdd){
                    userMailToAdd = user.data().mail

                //agregar usuario
                let add = async () => {
                    const userRef = doc(db, "users", userDocId);
                    userFriends.push(userMailToAdd)

                    await updateDoc(userRef, {
                        friends: userFriends
                    });
                }

                add()                    
                }
            })
        }

        loadMailUserAdd()
    }

    
    idDoc = new Promise((resolve, reject) => {
        let userFriends = this.state.userFriends
        const loadUsers = async () => {
            const users = await getDocs(collection(db, 'users'))
            let haveFriends = false

            let usersLoaded = []
            users.docs.map(user => usersLoaded.push(user))

            usersLoaded.map(user => {
                if(user.data().mail == this.props.userMail){
                    userDocId = user.id
                    userFriends = user.data().friends

                    this.setState({
                        userFriends: user.data().friends
                    })

                    haveFriends = true
                }

            })

            if(haveFriends){
                resolve(userFriends)
            }else{
                resolve(['none'])
            }
        }

        loadUsers()            
    })   

    openGlobalChat = () => {
        this.setState({
            openGlobalChat: !this.state.openGlobalChat
        })
    }

    render(){     

        let messagingBoxStyles = {
            marginTop:'190px',
            userSel: '',
            marginLeft: [this.state.openMessagesDisplay ? '0px' : 'calc(50% - 175px)'],
            width: [this.state.openMessagesDisplay ? '200px' : '350px']
        }

        document.title = 'Home'
        return (
            <React.Fragment>
                <div id='home' onClick={this.closeDisplays}>
                    <SuperiorBar 
                    openDisplaySetting={this.openDisplaySetting} 
                    openDisplaySettingValue={this.state.openDisplaySettingValue} 
                    userName={this.props.userName} 
                    logOut={this.props.logOut}
                    openDisplayFriendsValue={this.state.openDisplayFriendsValue}
                    openDisplayFriends={this.openDisplayFriends}
                    openDisplayAddFriends={this.openDisplayAddFriends}
                    loadFriends={this.props.loadFriends}
                    openGlobalChat={this.openGlobalChat} />

                    <MessagingBox 
                    openMessagesDisplayValue={this.state.openMessagesDisplay} 
                    userMail={this.props.userMail} 
                    loadUsersChat={this.props.loadUsersChat}
                    otherStyles={messagingBoxStyles} 
                    openDisplaySetting={this.openDisplaySetting}
                    openMessagesDisplay={this.openMessagesDisplay}
                    setUserSel={this.setUserSel}
                    openNewChatAddDisplay={this.openNewChatAddDisplay} />
                </div>

                {
                    this.state.openDisplayAddFriendsValue ? <AddFrendsDisplay 
                loadUsersDB={this.props.loadUsersDB}
                userName={this.props.userName}
                userMail={this.props.userMail}
                close={this.openDisplayAddFriends}
                openDisplayAddFriendsValue={this.state.openDisplayAddFriendsValue}
                addUser={this.addFriend}
                idDoc={this.idDoc} /> : null
                }

                
                
                {this.state.openMessagesDisplay || this.state.openGlobalChat ? <MessagesBoxDisplay 
                userSel={this.state.userSel}
                userNameSel={this.state.userNameSel}
                userMail={this.props.userMail} 
                users={this.state.users} 
                close={this.openMessagesDisplay} 
                open={this.state.openMessagesDisplay}
                getUserSelName={this.getUserSelName}
                openGlobalChat={this.state.openGlobalChat} /> : null}

                {
                    this.state.openNewChatToAddDisplay ? <NewChatAddDisplay open={this.state.openNewChatToAddDisplay} userMail={this.props.userMail} /> : null
                }
            </React.Fragment>
        )
    }
}