import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../style/feedback.css';

class Feedback extends Component {
  render() {
    const { assertions, playerScore } = this.props;
    return (
      <div className="container-feedback">
        <Header />
        <div className="h2-container">
          {
            assertions <= 2
              ? <h2 data-testid="feedback-text" className="phrase">Could be better...</h2>
              : <h2 data-testid="feedback-text" className="phrase">Well Done!</h2>

          }
          <h2 className="feedback-phrase">
            Você tem
            {' '}
            <span data-testid="feedback-total-score">
              { playerScore }
            </span>
            {' '}
            pontos!
          </h2>
          <h2 className="feedback-phrase">
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">
              { assertions }
            </span>
            {' '}
            questões!
          </h2>
        </div>
        <div className="buttons-container">
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              className="button-feedback"
            >
              Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              className="button-feedback"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
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
