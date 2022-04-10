import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import db from './dbConexion'

import '../styles/home.css'

import usersJSON from "../users.json"

import SuperiorBar from './SuperiorBar'
import MessagingBox from './MessagingBox'
import MessagesBoxDisplay from './MessagesBoxDisplay'
import AddFrendsDisplay from './AddFriendsDisplay';

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
        openDisplayAddFriendsValue: false
    }

    openMessagesDisplay = e => {
        if(!this.state.openMessagesDisplay){
            e.target.className = e.target.className.replace('messagingUserItemUnselect', '')
            e.target.className = e.target.className + ' messagingUserItemSelect'

            this.setState({
                userSelElem: e.target,
                userSel: e.target.innerText
            })
        }else{
            this.state.userSelElem.className = this.state.userSelElem.className.replace('messagingUserItemSelect', 'messagingUserItemUnselect')
        }
        

        this.setState({
            openMessagesDisplay: !this.state.openMessagesDisplay
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

    closeDisplays = (e) => {
       this.state.openDisplaySettingValue ? this.openDisplaySetting() : console.log('')
       e.target.className == 'friendsMiniDisplay' ? console.log('') : this.state.openDisplayFriendsValue ? this.openDisplayFriends() : console.log('')
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
                    loadFriends={this.props.loadFriends} />

                    <MessagingBox 
                    openMessagesDisplayValue={this.state.openMessagesDisplay} 
                    userMail={this.props.userMail} 
                    loadUsersChat={this.props.loadUsersChat}
                    otherStyles={messagingBoxStyles} 
                    openDisplaySetting={this.openDisplaySetting}
                    openMessagesDisplay={this.openMessagesDisplay}/>
                </div>

                {
                    this.state.openDisplayAddFriendsValue ? <AddFrendsDisplay 
                loadUsersDB={this.props.loadUsersDB}
                userName={this.props.userName}
                userMail={this.props.userMail}
                close={this.openDisplayAddFriends}
                openDisplayAddFriendsValue={this.state.openDisplayAddFriendsValue} /> : null
                }

                
                
                {this.state.openMessagesDisplay ? <MessagesBoxDisplay 
                userSel={this.state.userSel}
                userNameSel={this.state.userNameSel}
                userMail={this.props.userMail} 
                users={this.state.users} 
                close={this.openMessagesDisplay} 
                open={this.state.openMessagesDisplay}
                getUserSelName={this.getUserSelName} /> : null}
            </React.Fragment>
        )
    }
}