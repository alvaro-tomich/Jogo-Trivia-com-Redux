import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/ranking.css';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const { name, score, email } = this.props;
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([{ name, score, email }]));
    } else {
      localStorage.setItem(
        'ranking',
        JSON.stringify([...JSON.parse(localStorage.getItem('ranking')),
          { name, score, email }]),
      );
    }
    this.setState({
      ranking: JSON.parse(localStorage.getItem('ranking')),
    });
  }

  render() {
    const { ranking } = this.state;
    if (ranking.length === 0) {
      return <p>Carregando...</p>;
    }
    ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title">Ranking Jogador</h1>
        <div className="ranking-board">
          {(ranking
          && (
            <>
              {ranking.map((curr, index) => (
                <div className="player-ranking" key={ index }>
                  <img
                    className="player-image"
                    src={ `https://www.gravatar.com/avatar/${md5(curr.email).toString()}` }
                    alt="Gravathar Icon"
                  />
                  <p
                    className="player-name"
                    data-testid={ `player-name-${index}` }
                  >
                    { curr.name }
                  </p>
                  <p
                    className="player-score"
                    data-testid={ `player-score-${index}` }
                  >
                    { curr.score }
                  </p>
                </div>
              ))}
            </>
          ))}
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="gohome-button"
          >
            Voltar ao início
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Ranking);
