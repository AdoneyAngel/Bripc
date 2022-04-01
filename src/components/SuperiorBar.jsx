import React from 'react'
import settingIcon from '../icons/settings.png'
import heartIcon from '../icons/heart.png'

import ProfileSettingMiniDisplay from './ProfileSettingMiniDisplay'

export default class superiorBar extends React.Component{

    state = {
        openSetting: false
    }

    render(){
        return (
            <div className='superiorBar'>
                <h1>{this.props.userName}</h1>
                <button onClick={() => {
                    this.setState({
                        openSetting: !this.state.openSetting
                    })
                }}><img src={settingIcon} alt="" /></button>
                <button><img src={heartIcon} alt="" /></button>
                <ProfileSettingMiniDisplay open={this.state.openSetting} logOut={this.props.logOut}/>
            </div>
        )
    }
}