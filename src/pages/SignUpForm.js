import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../css/SignForm.css';
import '../css/SignUpForm.css';

// the base url
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            emailErrorMessages: [],

            password1: '',
            password1ErrorMessages: [],

            password2: '',
            password2ErrorMessages: [],

            username: '',
            usernameErrorMessages: [],

            firstname: '',
            firstnameErrorMessages: [],

            lastname: '',
            lastnameErrorMessages: [],

            hasAgreed: false,
            errMessages: []
        };

    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (e) => {
        const updateErrors = (obj) => {
            let key;

            for(key in obj){
                switch (key) {
                    case "username":
                        this.setState({
                            usernameErrorMessages: obj[key]
                        })
                        break;
                    case "email":
                        this.setState({
                            emailErrorMessages: obj[key]
                        })
                        break;
                    case "firstname":
                        this.setState({
                            firstnameErrorMessages: obj[key]
                        })
                        break;
                    case "lastname":
                        this.setState({
                            lastnameErrorMessages: obj[key]
                        })
                        break;
                    case "password1":
                        this.setState({
                            password1ErrorMessages: obj[key]
                        })
                        break;
                    case "password2":
                        this.setState({
                            password2ErrorMessages: obj[key]
                        })
                        break;

                    default:
                        break;
                }
                
            }
        }

        e.preventDefault()
        this.setState({
            usernameErrorMessages: [],
            password1ErrorMessages: [],
            password2ErrorMessages: [],
            emailErrorMessages: [],
            firstnameErrorMessages: [],
            lastnameErrorMessages: [],
            errMessages: []
        })
        console.log(this.state);

        // submit the data to backend
        try {
            const response = await axios({
                method: 'post',
                url: `${BACKEND_HOST}/auth/register/`,
                timeout: 4000,    // 4 seconds timeout
                data: {
                    username: this.state.username,
                    password1: this.state.password1,
                    password2: this.state.password2,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                }
            })

            // the response data
            const responseData = await response.data;

            console.log(responseData);
            this.setState({
                errMessages: (responseData["detail"] == null) ? [] : [responseData["detail"]]
            })

        }catch(e){
            console.log(e.response.data);
            updateErrors(e.response.data)
            this.setState({
                errMessages: (e.response.data["non_field_errors"] == null) ? [] : e.response.data["non_field_errors"]
            })
        }
    }

    render() {
        return (
            <div className="FormCenter" >
                <form onSubmit={this.handleSubmit} className="FormFields">
                    {this.state.errMessages.map(
                        (error, index) => (
                            <p className="alert-box" id="field-err" key={index}>{error}</p>
                        )
                    )}
                    <div className="FormField" >
                        <label className="FormField__Label" htmlFor="username" > Username </label>
                        <input type="text"
                            id="username"
                            className="FormField__Input"
                            placeholder="Enter your Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required />
                        {this.state.usernameErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}
                    </div>
                    
                    <div className="FormField" >
                        <label className="FormField__Label" htmlFor="name" > First Name </label>
                        <input type="text"
                            id="firstname"
                            className="FormField__Input"
                            placeholder="Enter your First Name"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            required />
                        {this.state.firstnameErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}

                    </div>

                    <div className="FormField" >
                        <label className="FormField__Label" htmlFor="name" > Last Name </label>
                        <input type="text"
                            id="lastname"
                            className="FormField__Input"
                            placeholder="Enter your Last Name"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            required />
                        {this.state.lastnameErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}
                    </div>

                    <div className="FormField" >
                        <label className="FormField__Label" htmlFor="email" > E - Mail Address </label>
                        <input type="email"
                            id="email"
                            className="FormField__Input"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required />
                        {this.state.emailErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}

                    </div >

                    <div className="FormField" >
                        <label className="FormField__Label" htmlFor="password1" > Password </label>
                        <input type="password"
                            id="password1"
                            className="FormField__Input"
                            placeholder="Enter your password"
                            name="password1"
                            value={this.state.password1}
                            onChange={this.handleChange}
                            required />
                        {this.state.password1ErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}

                    </div>

                    <div className="FormField" >
                        <label className="FormField__Label" htmlFor="password2" > Confirm Password </label>
                        <input type="password"
                            id="password2"
                            className="FormField__Input"
                            placeholder="Confirm your password"
                            name="password2"
                            value={this.state.password2}
                            onChange={this.handleChange}
                            required />
                        {this.state.password2ErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}

                    </div>

                    <div className="FormField" >
                        <label className="FormField__CheckboxLabel" >
                            <input className="FormField__Checkbox"
                                type="checkbox"
                                name="hasAgreed"
                                value={this.state.hasAgreed}
                                onChange={this.handleChange}
                                required 
                            />

                            I agree all statements in <a href="/" className="FormField__TermsLink">terms of service</a >
                        </label>
                    </div >

                    <div className="FormField" >
                        <input type="submit" className="FormField__Button mr-20" value="Sign Up" />
                        <Link to="/auth/sign-in" className="FormField__Link ">I'm already member</Link>
                    </div >
                </form>
            </div >
        );
    }
}

export default SignUpForm;