import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../style/header.css';

class Header extends Component {
  render() {
    const { playerInfo } = this.props;
    const { name, gravatarEmail, score } = playerInfo;
    const convertedEmail = md5(gravatarEmail).toString();
    return (
      <header>
        <div className="image-name">
          <img
            className="header-img"
            alt="player-icon"
            src={ `https://www.gravatar.com/avatar/${convertedEmail}` }
            data-testid="header-profile-picture"
          />
        </div>
        <p className="player">
          {' '}
          <span data-testid="header-player-name">{ name }</span>
        </p>
        <div>
          <p className="points">
            Pontos:
            {' '}
            <span data-testid="header-score">
              { score }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  playerInfo: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  playerInfo: state.player,
});

export default connect(mapStateToProps)(Header);
