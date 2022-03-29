import React from 'react'

import SignUpForm from './SignUpForm'
import AlertNotify from './AlertNotify'
import SuperiorBar from './PrincipalSuperiorBar'

export default class signUp extends React.Component{

    render(){
        document.title = 'Sign Up'
        return (
            <React.Fragment>
                <SuperiorBar/>
                <AlertNotify showAlert={this.props.showAlertValue} txt={this.props.alertTxt}/>
                <div className='signupBox'>
                    <SignUpForm showAlert={this.props.showAlert} showAlertValue={this.props.showAlertValue} loadUsersDb={this.props.loadUsersDb} setCookie={this.props.setCookie} sendForm={this.sendForm} saveLog={this.props.saveLog}/>
                </div>
            </React.Fragment>
        )
    }
}