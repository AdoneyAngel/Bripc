import React from 'react'

import '../styles/messagingUserItem.css'

export default class MessagingUserItem extends React.Component{

    state = {
        messages: []
    }

    loadUsersChat = new Promise((resolve, reject) => {
        let messages = []

        this.props.users.then(messagesLoaded => {
            let messagesLoadedObject = Object.values(messagesLoaded)

            for(let message in messagesLoadedObject){
                if(messagesLoadedObject[message].user1 == this.props.userMail){

                    if(messagesLoadedObject[message].writer == this.props.userMail){
                        
                        let newMessage = [
                            {
                                "user":"me",
                                "txt":messagesLoadedObject[message].txt,
                                "date":messagesLoadedObject[message].date,
                                "userMail":messagesLoadedObject[message].writer
                            }
                        ]

                        messages.push(newMessage)                        
                    }else{
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
    render(){
        
        return (
            <React.Fragment>
                {
                    this.state.messages.map(message => {
                        let messageObject = Object.values(message)[0]

                        if(messageObject.user != 'me'){
                            return <div 
                            name='user-btn'
                            key={messageObject.txt} 
                            onClick={this.props.openMessagesDisplay} 
                            className='messagingUserItem userMessage-me'>{messageObject.userMail}</div>
                        }
                    })
                }
            </React.Fragment>

                /*this.props.users.map(user => {
                    return <div key={user.id} onClick={this.props.openMessagesDisplay.bind("${user.name}")} className='messagingUserItem'>{user.name}</div>
                })*/
        )
    }
}