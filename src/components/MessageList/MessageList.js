import React, { Component } from "react";

class MessageList extends Component {

    render() {
        return (
            <ul>
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