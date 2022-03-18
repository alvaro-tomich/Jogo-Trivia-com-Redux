import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../style/game.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <section className="game-page">
        <div>
          <Header />
        </div>
        <div className="questions">
          <Questions history={ history } />
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Game;
