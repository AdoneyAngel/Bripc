import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import '../styles/app.css'
import '../styles/sign.css'

import db from './dbConexion'

import SignIn from './SignIn'
import SignUp from "./SignUp";
import Home from "./Home";

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

    loadUsersDB = new Promise((resolve, reject) => {
        const load = async () => {
            const users = await getDocs(collection(db, 'users'))
    
            let usersLoaded = []
    
            users.docs.map(user => usersLoaded.push(user.data()))

            resolve(usersLoaded)
        }

        load()
    })

    loadUsersChat = new Promise((resolve, reject) => {
        fetch('https://bripc-7b1b1-default-rtdb.europe-west1.firebasedatabase.app/chats.json')
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

        if(!this.userMailCookie() && window.location.pathname != '/signin' && !this.userMailCookie() && window.location.pathname != '/signup'){
            window.location = '/signin'
        }else if(!this.userNameCookie() && window.location.pathname != '/signin' && !this.userNameCookie() && window.location.pathname != '/signup'){
            window.location = '/signin'
        }
        
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn 
                    loadUsersDB={this.loadUsersDB} 
                    setCookie={this.setCookie} 
                    checkLogin={this.checkLogin} 
                    saveLog={this.saveLog}
                    showAlert={this.showAlert}
                    showAlertValue={this.state.showAlert}
                    alertTxt={this.state.alertTxt}/>}></Route>
                    
                    <Route path="/signup" element={<SignUp 
                    loadUsersDB={this.loadUsersDB} 
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