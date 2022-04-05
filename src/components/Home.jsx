import React from 'react'

import '../styles/home.css'

import usersJSON from "../users.json"

import SuperiorBar from './SuperiorBar'
import MessagingBox from './MessagingBox'
import MessagesBoxDisplay from './MessagesBoxDisplay'

export default class Home extends React.Component{

    state = {
        openMessagesDisplay: false,
        users: usersJSON,
        userName: this.props.userNameCookie
    }

    openMessagesDisplay = user => {
        this.props.setUserSelCookie(user)

        this.setState({
            openMessagesDisplay: !this.state.openMessagesDisplay
        })
        console.log(user.target)
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
                <div id='home'>
                    <SuperiorBar userName={this.props.userName} logOut={this.props.logOut}/>
                    <MessagingBox openMessagesDisplayValue={this.state.openMessagesDisplay} userMail={this.props.userMail} users={this.props.loadUsersChat} otherStyles={messagingBoxStyles} openMessagesDisplay={this.openMessagesDisplay}/>
                </div>
                {this.state.openMessagesDisplay ? <MessagesBoxDisplay userSel={this.state.userSel} userMail={this.props.userMail} users={this.state.users} close={this.openMessagesDisplay} open={this.state.openMessagesDisplay}/> : ''}
            </React.Fragment>
        )
    }
}