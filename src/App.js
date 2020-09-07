import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/App.css';
import IndexPage from './pages/IndexPage';
import AuthPage from './pages/AuthPage';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth/sign-in/:status?" component={AuthPage} />
          <Route path="/auth/sign-up" component={AuthPage} />
          <Route path="/auth/reset-password" component={AuthPage} />
          <Route path="/auth/confirm-password" component={AuthPage} />
          <Route path="/" component={IndexPage} />
        </Switch>  
      </Router >
    );
  }
}

export default App