import React from 'react'

import '../styles/messagingUserItem.css'

export default class MessagingUserItem extends React.Component{

    state = {
        messages: [],
        haveMessage: 'loading'
    }

    loadUsersChat = new Promise((resolve, reject) => {
        let messages = []

        this.props.users.then(messagesLoaded => {
            let messagesLoadedObject = Object.values(messagesLoaded)

            this.setState({
                haveMessage: 'not have'
            })

            for(let message in messagesLoadedObject){
                if(messagesLoadedObject[message].user1 == this.props.userMail){
                    this.setState({
                        haveMessage: 'have'
                    })

                    if(messagesLoadedObject[message].writer == this.props.userMail){
                        
                        let newMessage = [
                            {
                                "user":"me",
                                "txt":messagesLoadedObject[message].txt,
                                "date":messagesLoadedObject[message].date,
                                "userMail":messagesLoadedObject[message].writer,
                                "to": messagesLoadedObject[message].user1 == this.props.userMail ? messagesLoadedObject[message].user2 : messagesLoadedObject[message].user1
                            }
                        ]

                        messages.push(newMessage)                        
                    }else{
                        this.setState({
                            haveMessage: 'have'
                        })

                        let newMessage = [
                            {
                                "user":"he",
                                "txt":messagesLoadedObject[message].txt,
                                "date":messagesLoadedObject[message].date,
                                "userMail":messagesLoadedObject[message].writer
                            }
                        ]

                        messages.push(newMessage)   
                    }
                }
            }

            this.setState({
                messages: messages
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
                    this.state.haveMessage == 'have' ? this.state.messages.map(message => {
                        let messageObject = Object.values(message)[0]

                        if(messageObject){
                            return <div 
                            name='user-btn'
                            key={messageObject.txt} 
                            onClick={this.props.openMessagesDisplay} 
                            className='messagingUserItem userMessage-me'>{ messageObject.userMail != this.props.userMail ? messageObject.userMail : messageObject.to}</div>
                        }
                    }) : this.state.haveMessage == 'loading' ? this.componentElementErr('Loading chats') : this.componentElementErr("You don't have chats")
                }
            </React.Fragment>

                /*this.props.users.map(user => {
                    return <div key={user.id} onClick={this.props.openMessagesDisplay.bind("${user.name}")} className='messagingUserItem'>{user.name}</div>
                })*/
        )
    }
}