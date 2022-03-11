import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { history } = this.props;
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Questions history={ history } />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  getMapToken: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
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
