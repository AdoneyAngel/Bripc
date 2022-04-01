import React from "react";
import '../styles/alertNotify.css'

export default class AlertNotify extends React.Component{
    render(){
        let styles = {
            marginTop: [this.props.showAlert ? '0' : '-50%']
        }
        
        return (
            <div style={styles} className="alertNotify">{this.props.txt}</div>
        )
    }
}