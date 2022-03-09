import React, { Component } from 'react';
import fetchQuestions from '../services/api';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
  }

  componentDidMount() {
    fetchQuestions();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  verifyLogin = (name, email) => {
    if (name.length === 0 || email.length === 0) {
      return true;
    }
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            <input
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ this.verifyLogin(name, email) }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
