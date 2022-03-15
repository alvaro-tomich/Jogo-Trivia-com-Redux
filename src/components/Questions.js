import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssertions, getPlayerScore } from '../redux/actions';

class Questions extends Component {
    state = {
      next: 0,
      nextButtonVisible: false,
      timer: 30,
    }

    componentDidMount() {
      const oneSecond = 1000;
      setInterval(() => { this.decreaseTimer(); }, oneSecond);
    }

    decreaseTimer = () => {
      const { timer } = this.state;
      if (timer >= 1) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }

    nextQuestionClick = () => {
      const { next } = this.state;
      const { questions, history } = this.props;
      const maxNumber = questions.length - 2;
      if (next <= maxNumber) {
        this.setState((prevState) => ({
          next: prevState.next + 1,
        }));
      }
      this.removeAnswerBorder();
      this.setState({
        nextButtonVisible: false,
        timer: 30,
      });
      const maxNextBtnNumber = 4;
      if (next === maxNextBtnNumber) {
        history.push('/feedback');
      }
    }

    generateAnswers = (questions) => {
      const { next, timer } = this.state;
      let isAnswersBtnDisabled = false;
      if (timer === 0) {
        isAnswersBtnDisabled = true;
      }
      const wrongAnswers = questions[next].incorrect_answers
        .map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            onClick={ this.changeAnswerColor }
            className="wrong-buttons"
            disabled={ isAnswersBtnDisabled }
          >
            { answer }
          </button>
        ));
      const arrOfAnswers = [
        <button
          key="correct"
          type="button"
          data-testid="correct-answer"
          onClick={ this.increaseScore }
          className="correct-button"
          disabled={ isAnswersBtnDisabled }
        >
          {questions[next].correct_answer }
        </button>,
        ...wrongAnswers,
      ];

      // mudar nome dessa função e colocar referẽncia
      const orderNumber = 0.5;
      function randOrd() {
        return (Math.round(Math.random()) - orderNumber);
      }
      return arrOfAnswers.sort(randOrd);
    }

    // Refatorar para deixar dinâmico sem manipular o DOM
    changeAnswerColor = () => {
      const correctButton = document.querySelector('.correct-button');
      correctButton.classList.add('correct-color');

      const wrongButtons = document.querySelectorAll('.wrong-buttons');
      wrongButtons.forEach((element) => element.classList.add('wrong-color'));
      this.setState({ nextButtonVisible: true });
    }

    removeAnswerBorder = () => {
      const correctButton = document.querySelector('.correct-button');
      correctButton.classList.remove('correct-color');

      const wrongButtons = document.querySelectorAll('.wrong-buttons');
      wrongButtons.forEach((element) => element.classList.remove('wrong-color'));
    }

    increaseScore = () => {
      this.changeAnswerColor();

      const { next, timer } = this.state;
      const {
        questions,
        playerScore,
        addPlayerScore,
        assertions,
        addAssertions,
      } = this.props;

      const questionLevels = {
        hard: 3,
        medium: 2,
        easy: 1,
      };

      const { difficulty } = questions[next];
      const levelScore = Object.entries(questionLevels)
        .find((level) => level[0] === difficulty);

      const numberTen = 10;
      const calculateScore = numberTen + (timer * levelScore[1]);
      localStorage.setItem('score', calculateScore);

      const assertionsTotal = assertions + 1;
      addAssertions(assertionsTotal);

      addPlayerScore(playerScore + calculateScore);
    }

    render() {
      const { next, nextButtonVisible, timer } = this.state;
      const { questions } = this.props;
      const nextButton = (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.nextQuestionClick }
        >
          Next
        </button>
      );
      if (questions.length === 0) {
        return <p>Carregando...</p>;
      }
      return (
        <div className="body-questions">
          <p>
            <span>{ timer }</span>
          </p>
          <p data-testid="question-category">{ questions[next].category }</p>
          <p data-testid="question-text">{ questions[next].question }</p>
          <div data-testid="answer-options" id="answers-div">
            {questions && this.generateAnswers(questions)}
          </div>
          {nextButtonVisible
          && nextButton}
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  playerScore: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  addPlayerScore: (playerScore) => (
    dispatch(getPlayerScore(playerScore))),
  addAssertions: (assertions) => (
    dispatch(getAssertions(assertions))),
});

Questions.propTypes = {
  addPlayerScore: PropTypes.func.isRequired,
  addAssertions: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  playerScore: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    length: PropTypes.number,
    category: PropTypes.string,
    question: PropTypes.string,
    difficulty: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
