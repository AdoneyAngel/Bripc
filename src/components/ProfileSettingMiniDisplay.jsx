import React from "react";
import logoutIcon from '../icons/logout.png'
import '../styles/profileSettingMiniDisplay.css'

export default class ProfileSettingMiniDisplay extends React.Component{

    render(){    
        const styles = {
            display: this.props.open ? 'flex' : 'none',
            animation: this.props.open ? 'openDisplay 0.2s linear' : 'closeDisplay 0.2s linear'
        }
        return (
            <div className="profileSettingMiniDisplay" style={styles}>
                <button onClick={this.props.logOut}><img src={logoutIcon} alt="" /><p>Log out</p></button>
            </div>
        )
    }
}