import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenThunk } from '../redux/actions/index';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
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

  handleClick = (event) => {
    event.preventDefault();
    const { getToken, history, getMapToken } = this.props;
    getToken();
    if (getMapToken) {
      localStorage.setItem('token', getMapToken);
    }
    history.push('/game');
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => (
    dispatch(fetchTokenThunk())),
});

const mapStateToProps = (state) => ({
  getMapToken: state.token,
});

Login.propTypes = ({
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getMapToken: PropTypes.string.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
