import React from "react";
import { doc, getDoc, getDocs, updateDoc, collection, onSnapshot } from "firebase/firestore";
import db from './dbConexion'

import '../styles/addFriendsDisplay.css'

import closeIcon from '../icons/back2.png'
import addIcon from '../icons/add_friends.png'
/*
const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true
});

*/

let userDocId
let userFriends

export default class AddFrendsDisplay extends React.Component{

    state = {
        userToSearch: '',
        usersFound: [],
        userId: '',
        friends: []
    }

    addUser = (userToAdd) => {

        let friendsLoaded = []

        let userMailToAdd

        //cargar mail del usuario
        const loadMailUserAdd = async () => {
            const users = await getDocs(collection(db, 'users'))

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

                    this.props.close()
                }

                add()                    
                }
            })
        }

        loadMailUserAdd()


        
    }



    render(){

            //cargar id del documento
        let idDoc = new Promise((resolve, reject) => {
            const loadUsers = async () => {
                const users = await getDocs(collection(db, 'users'))

                let usersLoaded = []
                users.docs.map(user => usersLoaded.push(user))

                usersLoaded.map(user => {
                    if(user.data().mail == this.props.userMail){
                        userDocId = user.id
                        userFriends = user.data().friends
                    }
                    resolve(userFriends)
                })
            }

            loadUsers()            
        })        

        let handleInputChange = (e) => {
            this.setState({
                userToSearch: e.target.value
            }, () => {
                idDoc.then(friends => {

                    let usersFound = new Promise((resolve, reject) => {
                        this.props.loadUsersDB.then(result => {
                            let usersLoaded = []
                            result.map(user => {
                                if(user.name.slice(0, (this.state.userToSearch.length)).toUpperCase() === this.state.userToSearch.toUpperCase() && user.name.toUpperCase() !== this.props.userName.toUpperCase() && !friends.includes(user.mail)){
                                    usersLoaded.push(user.name)
                                }
                            })
                
                            resolve(usersLoaded)
                        }) 
                    }) 
    
                    usersFound.then(res => {
                        this.setState({
                            usersFound: res
                        })
                    })

                })
            })
        }

        const styles = {
            animation: this.props.openDisplayAddFriendsValue ? 'openDisplayAni 0.2s linear' : 'openDisplayAni 0.2s linear'
        }
    
        return(
            <div style={styles} className="addFriendsDisplay">
                <div className="superiorAddFriendsDisplayBar">
                    <input onChange={handleInputChange} type="text" placeholder="Search user" />
                    <button><img onClick={this.props.close} src={closeIcon} /></button>
                </div>
                {
                    this.state.usersFound.map(user => {
                        return <div className="addFriendsDisplayFound"><p>{user}</p><button onClick={()=>{this.addUser(user)}}><img src={addIcon} alt="" /></button></div>
                    })
                }
            </div>
        )
    }
}