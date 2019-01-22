import React, { Component } from 'react';
import './CreateUserForm.css';

class CreateUserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            errorData: {
                errored: false,
                message: ''
            }
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);         
    }

    onChange(e) {
        this.setState({ username: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();                
        this.props.onSubmit(this.state.username);                
    }  

    
    componentDidUpdate(prevProps, prevState) {      

        if (prevProps.errorData !== this.props.errorData) {
            const eData = this.props.errorData;
            console.log("eData", eData);
            this.setState({ 
                errorData: {                    
                    ...this.state.errorData,
                    errored: eData.errored,
                    message: eData.message
                }});                      
        }        
    }

    render() {        

        let showError = '';            
      
        return (                        
            <div className="create-container">   
                <h3>New User Creation</h3>      
                <form className="create-form" onSubmit={this.onSubmit}>                    
                    <input type="text" placeholder="Enter new username for creation" onChange={this.onChange} />
                    <input type="submit" />
                </form>                                    
            </div>
        );
    }
}

export default CreateUserForm;