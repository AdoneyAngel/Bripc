import React from "react";

import '../styles/newChatBtn.css'
import plusIcon from '../icons/plus.png'

export default function NewChatBtn (props) {
    return (
        <button className="newChatBtn" onClick={()=>{props.callback()}}><img src={plusIcon} alt="" /></button>
    )
}