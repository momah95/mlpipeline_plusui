import React, { Component } from 'react';


import '../css/SignForm.css';

class ResetPasswordForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
        <div className="FormCenter" >
            <form onSubmit={this.handleSubmit} className="FormFields">
                <div className="FormField" >
                    <label className="FormField__Label" htmlFor="email" > E - Mail Address </label>
                    <input type="email"
                        id="email"
                        className="FormField__Input"
                        placeholder="Enter your email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}/>
                </div >


                <div className="FormField" >
                    <button className="FormField__Button mr-20" > Reset Password </button> 
                 {/* <Link to="/" className="FormField__Link ">Create an account</Link>  */}
                </div >
            </form >
        </div >
        );
    }
}

export default ResetPasswordForm;