import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {

    render() {
        return (
            <ul className="messagelist-container">
                {this.props.messages.map((message, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <span><h3>{message.senderId}</h3></span>
                                <p>{message.text}</p>
                            </div>                            
                        </li>
                    )                    
                })}
            </ul>
        )
    }
}

export default MessageList;