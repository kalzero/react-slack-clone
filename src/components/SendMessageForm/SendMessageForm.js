import React, { Component } from 'react';
import './SendMessageForm.css';

class SendMessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.ref = React.createRef();
    }

    onChange(e) {
        this.setState({ text: e.target.value });
        this.props.onChange();
        this.ref.current.focus();
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.text);
    }

    render() {
        return (            
            <div className="sendmessageform-container">
                <form onSubmit={this.onSubmit} className="sendmessageform-form">
                    <input ref={this.ref}type="text" placeholder="Jot something down" onChange={this.onChange} />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default SendMessageForm;