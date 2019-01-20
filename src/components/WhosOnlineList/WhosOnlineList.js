import React, { Component } from 'react'

export default class WhosOnlineList extends Component {
    render() {
    if (this.props.users) {
        return (
            <ul>
                {this.props.users.map((user, index) => {
                    return (
                        <li key={index}>{user.name} ({user.presence.state})</li>    
                    )
                })}
            </ul>
        )
    } else {
        return (<p>Loading...</p>)
    }
  }
}
