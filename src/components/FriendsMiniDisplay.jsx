import React from "react";
import { collection, getDocs } from "firebase/firestore";
import db from './dbConexion'

import '../styles/friendsMiniDisplay.css'

import addFriend from '../icons/add_friends.png'

export default class FriendsMiniDisplay extends React.Component{
        
    state = {
        friends: [],
        friendsNames: []
    }

    loadFriends = new Promise((resolve, reject) => {
        this.props.loadFriends.then(friends => {
            let friendsLoaded = []

            friends.map(friend => {
                friendsLoaded.push(friend)
            })

            this.setState({
                friends: friendsLoaded
            })


            let loadFriendsNames = new Promise((resolve, reject) => {
                const loadUsers = async () => {
                    let usersLoaded = []
                    const users = await getDocs(collection(db, 'users'))
        
                    this.state.friends.map(friend => {
                        usersLoaded.push(users.docs.filter(user => user.data().mail == friend)[0].data().name)
                    })
        
                    this.setState({
                        friendsNames: usersLoaded
                    })
                }
        
        
                loadUsers()
            })

            loadFriendsNames.then(res => {
            })
        })
    })
        
    render(){  

        const headerStyles = {
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--principal-color)',
            borderBottom: '2px solid var(--principal-color)'
        }

        const headerAddBtnStyles = {
            background: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '4px',
            paddingBottom: '3px',
            paddingTop: '3px',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
        }

        const addButtonImgStyles = {
            width: '20px'
        }
        
        const styles = {
            display: this.props.open ? 'block' : 'none',
            animation: this.props.open ? 'openDisplayAni 0.2s linear' : 'openDisplayAni 0.2s linear'
        }

        return (
            <div 
            onClick={(e) => e.stopPropagation()} style={styles} className="friendsMiniDisplay">
                <div style={headerStyles}>
                    <p style={{display: 'inline-block'}}>Friends</p>

                    <button onClick={()=>{this.props.openDisplayAddFriends(); this.props.close()}} style={headerAddBtnStyles}>
                        <img style={addButtonImgStyles} src={addFriend} alt="" />
                    </button>
                </div>
                {
                    this.state.friendsNames.map(friend => {
                        return <div><p>{friend}</p></div>
                    })
                }
            </div>
        )
    }
}