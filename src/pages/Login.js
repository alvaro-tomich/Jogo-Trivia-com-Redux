import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenThunk, getPlayerInfo, getAssertions, getPlayerScore }
from '../redux/actions/index';
import logo from '../trivia.png';
import memesEditions from '../images/edition-memes.png';
import '../style/login.css';

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

  resetAssertionsAndScore = () => {
    const { addPlayerScore, addAssertions } = this.props;
    addPlayerScore(0);
    addAssertions(0);
  }

  handleClick = async (event) => {
    event.preventDefault();
    this.resetAssertionsAndScore();
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
        <div className="title">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
        <img src={ memesEditions } className="edition-memes" alt="phrase" />
        <form className="form-login">
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              placeholder="Digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            <input
              name="name"
              data-testid="input-player-name"
              placeholder="Digite seu nome"
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
  addPlayerScore: (playerScore) => (
    dispatch(getPlayerScore(playerScore))),
  addAssertions: (assertions) => (
    dispatch(getAssertions(assertions))),
});

const mapStateToProps = (state) => ({
  getMapToken: state.token,
});

Login.propTypes = {
  addAssertions: PropTypes.func.isRequired,
  addPlayerScore: PropTypes.func.isRequired,
  getMapToken: PropTypes.arrayOf(PropTypes.string).isRequired,
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playerInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
