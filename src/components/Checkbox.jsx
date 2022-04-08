import {React, useState} from "react";

export default function Checkbox(props){
    const [checked, setChecked] = useState(false)

    let styles = {
        background: checked ? "var(--principal-color)" : "#e3e3e3",
        width: '16px',
        height: '16px',
        borderRadius: '4px',
        padding: "5px",
        userSelect: 'none',
        cursor: 'pointer',
        display: 'inline-block'
    }

    let imgStyles = {
        width: "100%",
        userSelect: 'none'
    }

    function click(){
        setChecked(!checked)

        props.callback(!checked)
    }

    return (
        <div onClick={click} style={styles}>{checked ? <img style={{
            filter: props.filterInvert ? 'invert(1)' : 'none',
            width: "100%",
            userSelect: 'none'
        }} src={props.checkTrue}/> : <img style={imgStyles} src={props.checkFalse} />}</div>
    )
}