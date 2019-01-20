import React, { Component } from 'react'
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";
import UsernameForm from "../../components/UsernameForm/UsernameForm";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import "./Login.css";

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
          currentScreen: 'WhatIsYourUsernameScreen',
          currentUsername: ''
        }
        this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
        this.onUsernameCreated = this.onUsernameCreated.bind(this);
    }

    onUsernameCreated(username) {
        if (username === '') {
            return;
        }
        fetch('http://localhost:3001/createuser', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({username})
        })
        .then(response => {
            this.setState({currentUsername: username, currentScreen: 'ChatScreen'})
        })
        .catch(error => {
            console.log(error);
        })
    }

    onUsernameSubmitted(username) {
        if (username === '') {
            return;
        }
        fetch('http://localhost:3001/authenticate', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'        
            },
            body: JSON.stringify({username})
        })
        .then(response => {  
            console.log(response);    
            this.setState({currentUsername: username, currentScreen: 'ChatScreen'})
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        let setForm = '';

        if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
            setForm = (
                <>  
                    <div className="login-body">
                        <div className="login-container">
                            <h3>LOGIN</h3>
                            <UsernameForm onSubmit={this.onUsernameSubmitted} />
                            <CreateUserForm onSubmit={this.onUsernameCreated} />
                        </div>                 
                    </div>
                </>
            );  
        } else if (this.state.currentScreen === 'ChatScreen') {
            setForm = <ChatScreen currentUsername={this.state.currentUsername} />;
        }
      
        return (
            <div>
                {setForm}
            </div>
        ); 
    }
}
