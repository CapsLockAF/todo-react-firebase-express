import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignupPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
