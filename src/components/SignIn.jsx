import React from 'react'

import SignInForm from './SignInForm'
import AlertNotify from './AlertNotify'
import SuperiorBar from './PrincipalSuperiorBar'

export default class SignIn extends React.Component{

    render(){
        document.title = 'Sign in'

        /*let date = new Date()
        let date2 = date.setTime(date + 1 * 24 * 60 * 60 * 1000)
        let expires = "; expires=" + date.toUTCString()

        document.cookie = "cookie=" + "unaCookie" + expires + "; path=/"*/

        return (
            <React.Fragment>
                <SuperiorBar/>
                <AlertNotify showAlert={this.props.showAlertValue} txt={this.props.alertTxt}/>
                <div id='SignInBox'>
                    <SignInForm showAlertValue={this.props.showAlertValue} showAlert={this.props.showAlert} checkLogin={this.props.checkLogin} loadUsersDB={this.props.loadUsersDB} saveLog={this.props.saveLog} sendForm={this.sendForm}/>            
                </div>                
            </React.Fragment>

        )
    }
}