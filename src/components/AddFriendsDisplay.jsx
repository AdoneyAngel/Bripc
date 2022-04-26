import React from "react";
import { doc, getDoc, getDocs, collection, onSnapshot, updateDoc } from "firebase/firestore";
import db from './dbConexion'

import '../styles/addFriendsDisplay.css'

import closeIcon from '../icons/close.png'
import addIcon from '../icons/add_friends.png'
/*
const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true
});

*/

export default class AddFrendsDisplay extends React.Component{

    state = {
        userToSearch: '',
        usersFound: [],
        usersMailsFound: [],
        userId: '',
        friends: []
    }

    addUser = async (userToAdd) => {

        const users = await getDocs(collection(db, 'users'))
    
        let friendsLoaded = []

        let userMailToAdd

        const userDocId = users.docs.filter(user => user.data().mail == this.props.userMail)[0].id

        //cargar mail del usuario
        let userFriends = this.state.userFriends

        users.docs.map(user => {
            if(user.data().name == userToAdd){
                userMailToAdd = user.data().mail

                //agregar usuario
                let add = async () => {
                    const userRef = doc(db, "users", userDocId);
                    userFriends.push(userMailToAdd)

                    await updateDoc(userRef, {
                        friends: userFriends
                    });
                }

                add()                    
            }
        })
    }

    render(){

        let handleInputChange = (e) => {
            if(e.target.value.length > 0)
            this.setState({
                userToSearch: e.target.value
            }, async () => {

                    const users = await getDocs(collection(db, 'users'))
                    const userFriends = users.docs.filter(user => user.data().mail == this.props.userMail)[0].data().friends

                    const userRef = users.docs.filter(user => user.data().mail == this.props.userMail)[0].id

                    const friends = users.docs.filter(user => user.data().mail == this.props.userMail)[0].data().friends

                    let usersLoaded = []
                    let usersMailsLoaded = []

                    users.docs.map(user => {
                        if(user.data().name.slice(0, (this.state.userToSearch.length)).toUpperCase() === this.state.userToSearch.toUpperCase() && user.data().name.toUpperCase() !== this.props.userName.toUpperCase() && !friends.includes(user.data().mail)){
                            let newUser = {
                                name: user.data().name,
                                mail: user.data().mail
                            }
                            usersLoaded.push(newUser)
                        }else if(user.data().mail.slice(0, (this.state.userToSearch.length)).toUpperCase() === this.state.userToSearch.toUpperCase() && user.data().mail.toUpperCase() !== this.props.userMail.toUpperCase() && !friends.includes(user.data().mail)){
                            let newUser = {
                                name: user.data().name,
                                mail: user.data().mail
                            }
                            usersMailsLoaded.push(newUser)
                        }
                    })

                    this.setState({
                        usersFound: usersLoaded,
                        userFriends: userFriends,
                        usersMailsFound: usersMailsLoaded
                    })
            })
        }

        const styles = {
            animation: this.props.openDisplayAddFriendsValue ? 'openDisplayAni 0.2s linear' : 'openDisplayAni 0.2s linear'
        }
    
        return(
            <div style={styles} className="addFriendsDisplay">
                <div className="superiorAddFriendsDisplayBar">
                    <input autoComplete="off" onChange={handleInputChange} type="text" placeholder="type the user name or email to search" />
                    <button><img onClick={this.props.close} src={closeIcon} /></button>
                </div>
                {
                    this.state.usersFound.length < 1 && this.state.usersMailsFound.length < 1 ? <div style={{opacity: '0.5'}} className="addFriendsDisplayFound">Search users</div> :
                    this.state.usersFound.map(user => {
                        return <div className="addFriendsDisplayFound"><p>{user.name}</p><p className="addFriendsDisplayFoundMail">{user.mail}</p><button onClick={()=>{

                            this.addUser(user.name)
                            this.props.close()
                            
                        }}><img src={addIcon} alt="" /></button></div>
                    })
                }
                {
                    this.state.usersMailsFound.length > 0 ? this.state.usersMailsFound.map(user => {
                        return <div className="addFriendsDisplayFound"><p>{user.name}</p><p className="addFriendsDisplayFoundMail">{user.mail}</p><button onClick={()=>{

                            this.addUser(user.name)
                            this.props.close()
                            
                        }}><img src={addIcon} alt="" /></button></div>
                    }) : null
                }
            </div>
        )
    }
}