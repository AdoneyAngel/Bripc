import React from "react";
import logo from '../icons/logo.png'

import '../styles/principalSuperiorBar.css'

export default class PrincipalSuperiorBar extends React.Component{
    render(){
        return (
            <div className="principalSuperiorBar">
                <img src={logo} alt="" />
                <h1>Bripc</h1>
            </div>
        )
    }
}