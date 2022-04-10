import React from "react";
import logoutIcon from '../icons/logout.png'
import '../styles/profileSettingMiniDisplay.css'

export default class ProfileSettingMiniDisplay extends React.Component{

    render(){    
        const styles = {
            display: this.props.open ? 'flex' : 'none',
            animation: this.props.open ? 'openDisplayAni 0.2s linear' : ''
        }
        return (
            <div className="profileSettingMiniDisplay" style={styles}>
                <button onClick={this.props.logOut}><img src={logoutIcon} alt="" /><p>Log Out</p></button>
            </div>
        )
    }
}