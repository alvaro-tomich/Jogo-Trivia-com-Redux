import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { playerInfo } = this.props;
    const { name, gravatarEmail } = playerInfo;
    const convertedEmail = md5(gravatarEmail).toString();
    return (
      <div>
        <img
          alt="player-icon"
          src={ `https://www.gravatar.com/avatar/${convertedEmail}` }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p
          data-testid="header-score"
        >
          0

        </p>
      </div>
    );
  }
}

Header.propTypes = {
  playerInfo: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  playerInfo: state.player,
});

export default connect(mapStateToProps)(Header);
