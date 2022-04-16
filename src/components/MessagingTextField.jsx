import React from 'react'
import logo from '../icons/send.png'

import '../styles/messagingTextField.css'

export default class MessagingTextfield extends React.Component{

    state = {
        message: ''
    }

    handleInput = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    render(){
        return (
            <div className='messagingTextFieldBox'>
                <input onChange={this.handleInput} type="text" placeholder='Write the message'/>
                <button onClick={() => {
                    if(this.state.message.length > 0){
                        this.props.sendMessage(this.state.message)
                    }
                }}><img src={logo} alt="" /></button>
            </div>
        )
    }
}