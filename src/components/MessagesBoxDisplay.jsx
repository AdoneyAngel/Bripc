import React from 'react'

import '../styles/messagesBoxDisplay.css'

import Display from './MessagesDisplay'
import TextField from './MessagingTextField'
import back from '../icons/back2.png'

export default class MessagesBoxDisplay extends React.Component{

    styles = () => {
        return ({
            left: this.props.open ? '200px' : '100%',
            animation: this.props.open ? 'openDisplay 0.2s ease' : 'closeDisplay 0.2s ease',
        })
    }

    messages = this.props.users

    render(){
        let superiorBarStyles = {
            zIndex: '1'
        }
        return (
            <div style={this.styles()} className='messagesBoxDisplay'>
                <div className='superiorBar'>
                    <button onClick={this.props.close} style={{"zIndex":" 4"}}><img src={back}/></button>
                    <h1 style={superiorBarStyles}>User name</h1>
                </div>
                <Display messages={this.messages}/>
                <TextField/>
            </div>
        )
    }
}