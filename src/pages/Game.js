import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchQuestionsThunk, fetchTokenThunk } from '../redux/actions';
import Questions from '../components/Questions';

class Game extends Component {
  async componentDidMount() {
    const { getQuestions, getMapToken } = this.props;
    await getQuestions(getMapToken);
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Questions />
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking

            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  getMapToken: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getMapToken: state.token,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => (
    dispatch(fetchQuestionsThunk(token))),
  getToken: () => (
    dispatch(fetchTokenThunk())),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
