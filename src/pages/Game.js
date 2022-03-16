import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <section>
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
