import React from "react";
import { collection, getDocs, setDoc , doc, onSnapshot} from "firebase/firestore";
import db from './dbConexion'

import '../styles/friendsMiniDisplay.css'

import addFriend from '../icons/add_friends.png'

export default class FriendsMiniDisplay extends React.Component{
        
    state = {
        friends: [],
        friendsNames: []
    }

    loadFriends = async () => {
        const users = await getDocs(collection(db, 'users'))
        const userRef = users.docs.filter(user => user.data().mail == this.props.userMail)[0].id

        const unsub = onSnapshot(doc(db, "users", userRef), (doc) => {

            const profile = doc.data()
            
            let friends = profile.friends.filter(friend => friend != 'none')

            this.setState({
                friends: friends
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

    }

    deleteFriend = async (friend) => {
        const users = await getDocs(collection(db, 'users'))
        const userProfile = users.docs.filter(user => user.data().mail == this.props.userMail)[0]
        const userRef = doc(db, 'users', userProfile.id)

        let userProfileData = userProfile.data()
        userProfileData.friends = userProfileData.friends.filter(userFriend => userFriend != friend)

        console.log(userRef)

        setDoc(userRef, userProfileData)

        this.props.close()
    }

    componentDidMount(){
        this.loadFriends()
    }
        
    render(){  

        const headerStyles = {
            background: 'var(--principal-color)',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold'
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
            <div onClick={(e) => e.stopPropagation()} style={styles} className="friendsMiniDisplay">
                <header style={headerStyles}>
                    <p style={{display: 'inline-block'}}>Friends</p>

                    <button onClick={()=>{this.props.openDisplayAddFriends(); this.props.close()}} style={headerAddBtnStyles}>
                        <img style={addButtonImgStyles} src={addFriend} alt="" />
                    </button>
                </header>
                {
                    this.state.friendsNames.map(friend => {
                        return (
                            <div className="friend" key={friend}>
                                <p> {friend} </p>

                                <div className="friendSettings">
                                    <button className="friendDelBtn advert-btn" onClick={() => {
                                        this.deleteFriend(this.state.friends[this.state.friendsNames.indexOf(friend)])
                                    }}>Delete friend</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}