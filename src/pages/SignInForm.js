import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import '../css/SignForm.css';

// the base url
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            usernameErrorMessages: [],
            password: '',
            passwordErrorMessages: [],
            errMessages: []
        };

    }


    componentDidMount(){
        if (this.props.match.params.status === "email-confirmed"){
            this.setState({
                errMessage: 'Email Has been verified! You can sign in now!'
            })
        }  
    }

    async authenticate(){
        const updateErrors = (obj) => {
            let key;

            for (key in obj) {
                switch (key) {
                    case "username":
                        this.setState({
                            usernameErrorMessages: obj[key]
                        })
                        break;
                    case "password":
                        this.setState({
                            passwordErrorMessages: obj[key]
                        })
                        break;
                    default:
                        break;
                }

            }
        }

        console.log(this.state);

        try{
            const response = await axios({
                method: 'post',
                url: `${BACKEND_HOST}/auth/login/`,
                timeout: 4000,    // 4 seconds timeout
                data: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
            
            // the response data
            const responseData = await response.data;
            
            // Store
            sessionStorage.setItem("access_token", responseData["access_token"]);
            sessionStorage.setItem("refresh_token", responseData["refresh_token"]);

            // the user details from the response data
            const userDetails = await responseData["user"];

            this.setState({
                errMessage: `Welcome ${userDetails["username"]}!`
            })

            sessionStorage.setItem("first_name", userDetails["first_name"]);
            sessionStorage.setItem("last_name", userDetails["last_name"]);
            sessionStorage.setItem("email", userDetails["email"]);
            sessionStorage.setItem("pk", userDetails["pk"]);
            sessionStorage.setItem("username", userDetails["username"]);

            // redirect home/index
            console.log(this.props.history.push("/"))

        }catch(e){
            console.log(e.response.data);
            updateErrors(e.response.data);
            this.setState({
                errMessages: (e.response.data["non_field_errors"] == null) ? [] : e.response.data["non_field_errors"]
            })

        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({
            usernameErrorMessages: [],
            passwordErrorMessages: [],
            errMessages: []
        })

        // use details to authenticate
        this.authenticate();
    }

    onChangeHandler = input =>(e)=>{
        this.setState({
            // ...this.state,
            [input]:e.target.value
        })
    }

    render() {
        return (
        <div className="FormCenter" >
            <form className="FormFields" onSubmit={this.handleSubmit}>
                {this.state.errMessages.map(
                    (error, index) => (
                        <p className="alert-box" id="field-err" key={index}>{error}</p>
                    )
                )}
                
                <div className="FormField" >
                    <label className="FormField__Label" htmlFor="username" >Username</label>
                    <input type="text"
                        id="username"
                        className="FormField__Input"
                        placeholder="Enter your Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeHandler('username')} required/>
                        {this.state.usernameErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}
                </div >

                <div className="FormField">
                    <label className="FormField__Label"
                        htmlFor="password" > Password </label>
                    <input type="password"
                        id="password"
                        className="FormField__Input"
                        placeholder="Enter your password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler('password')} required />
                        {this.state.passwordErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}
                </div >

                <div className="FormField" >
                    <input type="submit" className="FormField__Button mr-20" value="Sign In" />

                    <br></br>
                    <br></br>
                    <Link to="/auth/sign-up" className="FormField__Link ">Create an account</Link>
                    <Link to="/auth/reset-password" className="FormField__Link "> Reset Password</Link>
                </div >
            </form >
        </div >
        );
    }
}

export default SignInForm;