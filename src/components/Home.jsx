import React from 'react'

import '../styles/home.css'

import usersJSON from "../users.json"

import SuperiorBar from './SuperiorBar'
import MessagingBox from './MessagingBox'
import MessagesBoxDisplay from './MessagesBoxDisplay'

let messagingBoxStyles = {
    marginTop:'130px',
    userSel: ''
}

export default class Home extends React.Component{

    state = {
        openMessagesDisplay: false,
        users: usersJSON,
        homeScale: 'scale(1)',
        userName: this.props.userNameCookie
    }

    openMessagesDisplay = user => {
        if(!this.state.openMessagesDisplay){
            this.setUserSel(user)
        }

        this.setState({
            openMessagesDisplay: !this.state.openMessagesDisplay 
        }, () => {
            this.setState({
                homeScale: this.state.openMessagesDisplay ? "scale(0.98)" : "scale(1)"
            }, () => console.log(this.state))
        })
    }

    setUserSel = user => {
        this.setState({
            userSel: user
        }, () => console.log(this.state))
    }

    render(){
        let homeStyle = {
            transform: this.state.homeScale
        }

        document.title = 'Home'
        return (
            <React.Fragment>
                <div style={homeStyle} id='home'>
                    <SuperiorBar userName={this.props.userName} logOut={this.props.logOut}/>
                    <MessagingBox userMail={this.props.userMail} users={this.props.loadUsersChat} otherStyles={messagingBoxStyles} openMessagesDisplay={this.openMessagesDisplay}/>
                </div>
                <MessagesBoxDisplay userSel={this.state.userSel} userMail={this.props.userMail} users={this.state.users} close={this.openMessagesDisplay} open={this.state.openMessagesDisplay}/>
            </React.Fragment>
        )
    }
}