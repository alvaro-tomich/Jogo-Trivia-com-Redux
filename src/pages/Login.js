import React, { Component } from 'react';
import fetchQuestions from '../services/api';

class Login extends Component {
  componentDidMount() {
    fetchQuestions();
  }

  render() {
    return (
      <div>Login</div>
    );
  }
}

export default Login;
