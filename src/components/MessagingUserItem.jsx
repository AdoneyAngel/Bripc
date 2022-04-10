import React from 'react'

import '../styles/messagingUserItem.css'

export default class MessagingUserItem extends React.Component{

    state = {
        users: [],
        haveMessage: 'loading',
        loading: true
    }

    loadThisUsersChat = new Promise((resolve, reject) => {
        this.props.loadUsersChat.then(result => {
            let users = []

            for(let chats in result){
                if(result[chats].user1 == this.props.userMail){
                    users.push(result[chats].user2)
                }
            }

            this.setState({
                users: users,
                loading: false
            })
        })
    })

    componentElementErr = txt => {
        return <div 
        name='user-btn'
        key='0' 
        onClick='none' 
        className='messagingUserItem user-message-err'>{txt}</div>
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
                    }) : this.componentElementErr('You not have chats')
                }
            </React.Fragment>

                /*this.props.users.map(user => {
                    return <div key={user.id} onClick={this.props.openMessagesDisplay.bind("${user.name}")} className='messagingUserItem'>{user.name}</div>
                })*/
        )
    }
}