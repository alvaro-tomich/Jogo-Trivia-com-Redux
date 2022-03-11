import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenThunk, getPlayerInfo } from '../redux/actions/index';
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

  handleClick = async (event) => {
    event.preventDefault();
    const { getToken, history, getMapToken, playerInfo } = this.props;
    const { name, email } = this.state;
    await getToken();
    playerInfo(email, name);
    if (getMapToken) {
      localStorage.setItem('token', getMapToken);
    }
    history.push('/game');
  }

  settingsButtonClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('./settings');
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
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsButtonClick }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => (
    dispatch(fetchTokenThunk())),
  playerInfo: (email, name) => dispatch(getPlayerInfo(email, name)),
});

const mapStateToProps = (state) => ({
  getMapToken: state.token,
});

Login.propTypes = {
  getMapToken: PropTypes.arrayOf(PropTypes.string).isRequired,
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playerInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
