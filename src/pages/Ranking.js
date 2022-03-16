import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/ranking.css';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Jogador</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao início

          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
