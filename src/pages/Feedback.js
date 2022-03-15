import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, playerScore } = this.props;
    return (
      <div>
        <Header />
        <p>
          Você tem
          {' '}
          <span data-testid="feedback-total-score">
            { playerScore }
          </span>
          {' '}
          pontos!
        </p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          {' '}
          questões!
        </p>
        {
          assertions <= 2
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>

        }
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking

          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  playerScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
