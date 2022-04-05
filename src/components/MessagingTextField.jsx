import React from 'react'
import logo from '../icons/send.png'

import '../styles/messagingTextField.css'

export default class MessagingTextfield extends React.Component{
    render(){
        return (
            <div className='messagingTextFieldBox'>
                <input type="text" placeholder='Write the message'/>
                <button><img src={logo} alt="" /></button>
            </div>
        )
    }
}