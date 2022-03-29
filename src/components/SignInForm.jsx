import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import logo from '../icons/logo.png'

export default class SignInForm extends React.Component{
    
state = {
        userMail: '',
        userPass: '',
        erruserMail: true,
        errTypeuserMail: '',
        errAdvertuserMail: '',
        erruserPass: true,
        errTypeuserPass: '',
        errAdvertuserPass: '',
    }

    writting = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(e.target.name == 'userMail'){
                this.checkuserMail()
            }else if(e.target.name == 'userPass'){
                this.checkuserPass()
            }
        })
    }

    mailRef = () => useRef()

    checkuserMail = () => {
        if(this.state.userMail.length < 1){
            this.setState({
                erruserMail: true,
                errTypeuserMail: 'empty',
                errAdvertuserMail: 'You must fill this field'
            })
        }else if(this.state.userMail.indexOf('@') < 0){
            this.setState({
                erruserMail: true,
                errTypeuserMail: 'invalid',
                errAdvertuserMail: 'This mail is not valid'
            })
        }else{
            this.setState({
                erruserMail: false,
                errTypeuserMail: '',
                errAdvertuserMail: ''
            })
        }
    }

    checkuserPass = () => {
    
        if(this.state.userPass.length < 1){
            this.setState({
                erruserPass: true,
                errTypeuserPass: 'empty',
                errAdvertuserPass: 'You must fill this field'
            })
        }else{
            this.setState({
                erruserPass: false,
                errTypeuserPass: '',
                errAdvertuserPass: ''
            })
        }
    }

    checkLogin = () => {
        this.props.loadUsersDb.then(users => {
            let usersObject = Object.values(users)
            let exist = false

            for(let user in usersObject){
                if(usersObject[user].mail == this.state.userMail && usersObject[user].pass == this.state.userPass){
                    this.props.saveLog(usersObject[user].name, usersObject[user].mail)

                    exist = true

                    window.location = '/'
                }
            }

            if(!exist){this.props.showAlert('Mail or password is incorrect')}
        })
    }

    render(){

        let err = false
        
        if(this.state.erruserName || this.state.erruserMail || this.state.erruserPass){
            err = true
        }else{
            err = false
        }

        const imgTitleBoxStyles = {
            left: 'calc(50% - 150px)',
            position: 'absolute',
            display: 'block',
        }

        let formStyles = {
            boxShadow: [this.props.showAlertValue ? '0px 0px 73px 11px #ff000029' : '0px 0px 20px 11px #d9d9d942']
        }
        return (
            <React.Fragment>
                <form style={formStyles} className='signInUp' onSubmit={(e) => e.preventDefault()}>
                    <img style={imgTitleBoxStyles} src={logo} className='box-title-img' />
                    <div>
                        <h2>User mail</h2>
                        <input name='userMail' onChange={this.writting} type='text' placeholder='User mail'/>
                        <p className='errText'>
                            {
                                this.state.errAdvertuserMail
                            }
                        </p>
                    </div>
                    
                    <div>
                        <h2>Password</h2>
                        <input name='userPass' type='password' onChange={this.writting} placeholder='Password' ref={this.props.passRef}/>
                        <p className='errText'>
                            {
                                this.state.errAdvertuserPass
                            }
                        </p>
                    </div>
                    {
                        err ? <input type='button' value='Sign in' id='btn-log' className='btn-submit' disabled/> : <input value='Sign in' id='btn-log' className='btn-submit' type='submit' onClick={this.checkLogin}/>
                    }
                    <Link className='switchLog' to='/signup'>Sign up</Link>
                </form>
            </React.Fragment>
        )
    }
}