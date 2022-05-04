import React from "react";

import '../styles/miniDisplay.css'

export default function MiniDisplay(props){

    /*
    PROPS:
    elements = array,
    buttonType = string,
    button = boolean,
    buttonValue = string,
    buttonImage = img,
    text = boolean,
    buttonFromElements = boolean,
    elementsIsButton = boolean,
    buttons = object/array({hover: 'red/grey', value: 'string'})
    */

    return(
        <div className="miniDisplay">
            {
                props.elementsIsButton ? props.buttons.map(button => {
                    return <div><button onClick={() => button.click()} className={button.hover=='red' ? 'hoverBtnRed' : 'hoverBtnGrey'}>{button.value}</button></div>
                })
                :
                props.elements.map(elem => {
                })
            }
        </div>
    )
}