import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../styles/app.css'
import '../styles/sign.css'

import SignIn from './SignIn'
import SignUp from "./SignUp";
import Home from "./Home";

// import DB from './dbConexion'

// import 'firebase/auth'
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth(DB);

export default class App extends React.Component{
    
    state = {
        login: false,
        userName: '',
        userMail: '',
        page: 'home',
        showAlert: false,
        alertTxt: 'as'
    }

    saveLog = (userName, userMail) => {
        this.setCookie('userName', userName)
        this.setCookie('userMail', userMail)
    }

    loadUsersDb = new Promise((resolve, reject) => {
        fetch('https://messagingweb-674c3-default-rtdb.firebaseio.com/users.json')
        .then(res => res.json())
        .then(result => resolve(result))
    })

    loadUsersChat = new Promise((resolve, reject) => {
        fetch('https://messagingweb-674c3-default-rtdb.firebaseio.com/chats.json')
        .then(res => res.json())
        .then(result => resolve(result))
    })

    setCookie = (name, value) => {
        let date = new Date()
        date.setTime(date + 1 * 24 * 60 * 60 * 1000)
        let expires = "; expires=" + date.toUTCString()

        document.cookie = name + "=" + value + expires + "; path=/"
    }

    userNameCookie = () => {
        return document.cookie.replace(/(?:(?:^|.*;\s*)userName\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    }

    userMailCookie = () => {
        return document.cookie.replace(/(?:(?:^|.*;\s*)userMail\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    }

    userName = () => {
        return this.state.userName
    }

    userMail = () => {
        return this.state.userMail
    }

    checkLogin = (check) => {
        this.setState({
            login: check
        })
    } 

    showAlert = (alert) => {
        this.setState({
            showAlert: true,
            alertTxt: alert
        }, () => {
            setTimeout(() => this.setState({showAlert: false}), 2500)
        })
    }

    logOut = () => {
        document.cookie = 'userName='
        document.cookie = 'userMail='

        window.location = '/signin'
    }

    setUserSelCookie = user => {
        this.setCookie('userSel', user)
    }

    render(){
        console.log(this.state)

        if(!this.userMailCookie() && window.location.pathname != '/signin' && !this.userMailCookie() && window.location.pathname != '/signup'){
            window.location = '/signin'
        }else if(!this.userNameCookie() && window.location.pathname != '/signin' && !this.userNameCookie() && window.location.pathname != '/signup'){
            window.location = '/signin'
        }

        // auth.onAuthStateChanged(user => {
        //     user ? console.log('DB loged') : console.log('Error to load DB')
        // })
        
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn 
                    loadUsersDb={this.loadUsersDb} 
                    setCookie={this.setCookie} 
                    checkLogin={this.checkLogin} 
                    saveLog={this.saveLog}
                    showAlert={this.showAlert}
                    showAlertValue={this.state.showAlert}
                    alertTxt={this.state.alertTxt}/>}></Route>
                    
                    <Route path="/signup" element={<SignUp 
                    loadUsersDb={this.loadUsersDb} 
                    setCookie={this.setCookie} 
                    checkLogin={this.checkLogin} 
                    saveLog={this.saveLog}
                    showAlert={this.showAlert}
                    showAlertValue={this.state.showAlert}
                    alertTxt={this.state.alertTxt}/>}></Route>
                    
                    <Route path="/" element={<Home 
                    userName={this.userNameCookie()} 
                    userMail={this.userMailCookie()} 
                    loadUsersChat={this.loadUsersChat} 
                    checkLogin={this.checkLogin} 
                    userNameCookie={this.userNameCookie} 
                    setUserSelCookie={this.setUserSelCookie}
                    log={this.state.login}
                    logOut={this.logOut} />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}