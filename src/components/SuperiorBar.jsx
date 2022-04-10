import React from 'react'
import settingIcon from '../icons/settings.png'
import heartIcon from '../icons/heart.png'
import friendsIcon from '../icons/friends.png'
import logo from '../icons/logo.png'

import ProfileSettingMiniDisplay from './ProfileSettingMiniDisplay'
import FriendsMiniDisplay from './FriendsMiniDisplay'

export default class superiorBar extends React.Component{

    state = {
    }

    render(){
        return (
            <div className='superiorBar'>
                <h1><img style={{width:  '37px'}} src={logo} alt="" />{this.props.userName}</h1>
                <button onClick={this.props.openDisplaySetting}><img src={settingIcon} alt="" /></button>
                <button><img src={heartIcon} alt="" /></button>
                <button onClick={this.props.openDisplayFriends}><img src={friendsIcon} alt="" /></button>
                <ProfileSettingMiniDisplay open={this.props.openDisplaySettingValue} logOut={this.props.logOut}/>
                <FriendsMiniDisplay close={this.props.openDisplayFriends} openDisplayAddFriends={this.props.openDisplayAddFriends} loadFriends={this.props.loadFriends} open={this.props.openDisplayFriendsValue}/>
            </div>
        )
    }
}