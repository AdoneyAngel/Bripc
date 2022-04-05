import React from 'react'
import {Link} from 'react-router-dom'

import logo from '../icons/logo.png'

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

    signUp = () =>{
        fetch('https://bripc-7b1b1-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.userName,
                mail: this.state.userMail,
                pass: this.state.userPass                
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }})
            .then(res => res.json())
            .then(result => {
                this.props.saveLog(this.state.userName, this.state.userMail)

                window.location = '/'
            })
    }

    checkLogin = () => {
        this.props.loadUsersDb.then(res => {
            let usersObject = Object.values(res)
            let errorType

            let err = false

            for(let user in usersObject){
                if(usersObject[user].name == this.state.userName || usersObject[user].mail == this.state.userMail){
                    if(usersObject[user].name == this.state.userName){
                        errorType = 'name'
                        err = true
                        break
                    }else{
                        errorType = 'mail'
                        err = true
                        break
                    }


                }
            }

            if(err){
                if(errorType == 'name'){
                     this.props.showAlert('This user name is already in use')
                }else{
                    this.props.showAlert('This user mail is already in use')
                }
                
            }else{
                this.signUp()
            }
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
                        <input onChange={this.writting} name='userPass' type='password' placeholder='Password'/>
                        <p className='errText'>
                            {
                                this.state.errAdvertuserPass
                            }
                        </p>
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