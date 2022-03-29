import React from 'react'

import '../styles/messagesBoxDisplay.css'

import Display from './MessagesDisplay'
import TextField from './MessagingTextField'

export default class MessagesBoxDisplay extends React.Component{

    styles = () => {
        return ({
            left: this.props.open ? '0%' : '100%'
        })
    }

    messages = this.props.users.filter((x) => x.name == 'Adoney')

    render(){
        return (
            <div style={this.styles()} className='messagesBoxDisplay'>
                <div className='superiorBar'>
                    <button onClick={this.props.close} style={{"zIndex":" 4"}}>←</button>
                    <h1 style={{"zIndex:":"1"}}>User name</h1>
                </div>
                <Display messages={this.messages[0]}/>
                <TextField/>
            </div>
        )
    }
}