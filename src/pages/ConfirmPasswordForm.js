import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ResetPasswordForm from './ResetPasswordForm';
import ConfirmPasswordForm from './ConfirmPasswordForm';

import '../css/SignForm.css';
import '../css/SignUpForm.css';

class AuthPage extends Component {
    render() {
        return (
            <div className="App">
                <div className="App__Aside" > </div>
                <div className="App__Form" >
                    <div className="PageSwitcher" >
                        <NavLink to="/auth/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item" > Sign In </NavLink>
                        <NavLink to="/auth/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item" > Sign Up </NavLink>
                    </div>

                    <div className="FormTitle" >
                        <Route exact path="/auth/sign-in">
                            <NavLink to="/auth/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link" > Sign In </NavLink>
                        </Route>

                        <Route exact path="/auth/sign-up">
                            <NavLink exact to="/auth/sign-up" activeClassName="FormTitle__Link--Active " className="FormTitle__Link ">Sign Up</NavLink>
                        </Route>

                        <Route exact path="/auth/reset-password">
                            <NavLink exact to="/auth/reset-password" activeClassName="FormTitle__Link--Active " className="FormTitle__Link ">Reset password</NavLink>
                        </Route>

                        <Route exact path="/auth/confirm-password">
                            <NavLink exact to="/auth/confirm-password" activeClassName="FormTitle__Link--Active " className="FormTitle__Link ">Confirm Password</NavLink>
                        </Route>
                    </div>

                    <Switch>
                        <Route path="/auth/sign-in/:status?" component={SignInForm} />
                        <Route path="/auth/sign-up" component={SignUpForm} />
                        <Route path="/auth/reset-password" component={ResetPasswordForm} />
                        <Route path="/auth/confirm-password" component={ConfirmPasswordForm} />
                    </Switch>
                    
                </div >
            </div>
        );
    }
}

export default AuthPage;