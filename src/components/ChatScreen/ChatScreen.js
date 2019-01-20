import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import MessageList from "../MessageList/MessageList";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import WhosOnlineList from "../WhosOnlineList/WhosOnlineList";

class ChatScreen extends Component {
    constructor() {
        super()

        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: []
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
    }

    componentWillMount() {
        console.log('ComponentWillMount', this.props);
    }

    componentDidMount() {
        console.log('ComponentDidMount', this.props);
        //console.log(this.props.currentUsername);

        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:34f7d685-7cbf-42ef-b022-3e8900a5bb8c',
            userId: this.props.currentUsername,
            tokenProvider: new TokenProvider({ url: 'http://localhost:3001/authenticate' })
        });

        chatManager
            .connect() // connects to ChatKit server
            .then(currentUser => {
                // set the state with the response object
                this.setState({currentUser: currentUser});  
                console.log(currentUser);
                // subscribe to the default room
                // must return the subscription so the next then method will have the response object
                return currentUser.subscribeToRoom({
                    roomId: '19385668',
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => { 
                            this.setState({usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]});
                        },
                        onUserStoppedTyping: user => { 
                            this.setState({usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                username => username !== user.name
                            )});
                        },
                        onPresenceChanged: () => this.forceUpdate(),                        
                        onUserJoined: () => this.forceUpdate()
                    }
                })
            })
            .then(currentRoom => { 
                // set state with the current chat room from response object               
                this.setState({currentRoom: currentRoom});
            })
            .catch(error => console.log(error));
    }

    sendMessage(text) {        
        // calls the api to send message to ChatKit server
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text: text
        })
    }

    sendTypingEvent() {
        this.state.currentUser.isTypingIn({
            roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('Error', error));
    }

    render() {
        return (
            <div style={{
                    display: 'flex',
                    height: '100vh'
                }}>
                <div style={{
                    width: '30%',
                    backgroundColor: 'tomato'
                }}>
                    <WhosOnlineList users={this.state.currentRoom.users} />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        flex: '1'
                    }}>
                        <MessageList messages={this.state.messages} />                
                    </div>                    
                    <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                    <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
                </div>                             
            </div>
        );
    }
}

export default ChatScreen;