import React from 'react'
import {Link} from 'react-router-dom'
import { collection, addDoc } from "firebase/firestore";

import db from './dbConexion'

import logo from '../icons/logo.png'
import eye from '../icons/eye.png'
import closedEyes from '../icons/closed_eye.png'

import Checkbox from './Checkbox'

export default class SignInForm extends React.Component{
    
    state = {
        userName: '',
        userMail: '',
        userPass: '',
        erruserName: true,
        errTypeuserName: '',
        errAdvertuserName: '',
        erruserMail: true,
        errTypeuserMail: '',
        errAdvertuserMail: '',
        erruserPass: true,
        errTypeuserPass: '',
        errAdvertuserPass: '',
        showPass: false
    }

    writting = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(e.target.name == 'userName'){
                this.checkuserName()
            }else if(e.target.name == 'userMail'){
                this.checkuserMail()
            }else if(e.target.name == 'userPass'){
                this.checkuserPass()
            }
        })
    }

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

    checkuserName = () => {
    
        if(this.state.userName.length < 1){
            this.setState({
                erruserName: true,
                errTypeuserName: 'empty',
                errAdvertuserName: 'You must fill this field'
            })
        }else{
            this.setState({
                erruserName: false,
                errTypeuserName: '',
                errAdvertuserName: ''
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

    signUp = async () =>{
        try {
            const docRef = await addDoc(collection(db, "users"), {
              name: this.state.userName,
              mail: this.state.userMail,
              pass: this.state.userPass,
              friends: ['none']
            });

            this.props.saveLog(this.state.userName, this.state.userMail)

            window.location = '/'
        } catch (e) {
            this.props.showAlert('An error occurred while creating the user')
        }
    }

    checkLogin = () => {
        this.props.loadUsersDB.then(result => {
            const users = Object.values(result)

            let exist = false

            let errType = ''

            users.map(user => {
                if(user.name == this.state.userName){
                    errType = 'name'
                    exist = true

                }else if(user.mail == this.state.userMail){
                    errType = 'mail'
                    exist = true

                }
            })

            if(!exist){
                this.signUp()

            }else{
                if(errType == 'name'){
                    this.props.showAlert('This name is already in use')
                }else{
                    this.props.showAlert('This mail is already in use')
                }
            }
        })
    }

    checkShowPass = (check) => {
        this.setState({
            showPass: check
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
            boxShadow: [this.props.showAlertValue ? '0px 0px 20px 11px #ff000029, 0px 0px 8px 1px #f1f1f1' : '0px 0px 20px 11px #d9d9d942, 0px 0px 8px 1px #f1f1f1']
        }

        return (
            <React.Fragment>
                <form style={formStyles} className='signInUp' onSubmit={(e) => e.preventDefault()}>
                    <img style={imgTitleBoxStyles} src={logo} className='box-title-img' />
                    <div>
                        <h2>User name</h2>
                        <input onChange={this.writting} name='userName' type='text' placeholder='User name'/>
                        <p className='errText'>
                            {
                                this.state.errAdvertuserName
                            }
                        </p>
                    </div>
                    
                    <div>
                        <h2>User mail</h2>
                        <input onChange={this.writting} name='userMail' type='text' placeholder='User mail'/>
                        <p className='errText'>
                            {
                                this.state.errAdvertuserMail
                            }
                        </p>
                    </div>
                    
                    <div>
                        <h2>Password</h2>
                        <input autoComplete='off' style={{
                            "WebkitTextSecurity": this.state.showPass ? 'none' : 'disc'
                        }} onChange={this.writting} name='userPass' type='text' placeholder='Password'/>

                        <p className='errText'>
                            {
                                this.state.errAdvertuserPass
                            }
                        </p>

                        <div style={{
                            gridColumn: 1,
                            gridColumnEnd: 3,
                            display: 'flex',
                            itemAlign: 'center',
                            marginTop: '10px'
                        }}>
                            <Checkbox 
                            checkTrue={eye}
                            checkFalse={closedEyes}
                            filterInvert={true}
                            callback={this.checkShowPass}/>
                            <p style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                marginLeft: '10px'
                            }}>Show password</p>                            
                        </div>
                    </div>
                    {
                        err ? <input type='button' value='Sign up' id='btn-log' className='btn-submit' disabled/> : <input value='Sign up' onClick={this.checkLogin} id='btn-log' type='submit' className='btn-submit'/>
                    }
                    <Link className='switchLog' to='/signIn'>Sign in</Link>
                </form>
            </React.Fragment>
        )
    }
}