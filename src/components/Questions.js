import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssertions, getPlayerScore, fetchQuestionsThunk } from '../redux/actions';
import '../style/questions.css';

const correctAnswerStr = '.correct-button';
const wrongAnswerStr = '.wrong-buttons';

class Questions extends Component {
    state = {
      next: 0,
      nextButtonVisible: false,
      timer: 30,
      answers: [],
    }

    async componentDidMount() {
      const { getQuestions, getMapToken } = this.props;
      await getQuestions(getMapToken);
      const { questions } = this.props;
      const oneSecond = 1000;
      setInterval(() => { this.decreaseTimer(); }, oneSecond);
      if (questions.length > 0) {
        this.generateAnswers(questions);
      }
    }

    decreaseTimer = () => {
      const { timer } = this.state;
      if (timer >= 1) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }

      if (timer === 0) {
        this.disableAnswers();
        this.changeAnswerColor();
      }
    }

    nextQuestionClick = () => {
      const { next } = this.state;
      const { questions, history } = this.props;
      const maxNumber = questions.length - 2;
      if (next <= maxNumber) {
        this.setState((prevState) => ({
          next: prevState.next + 1,
        }), () => this.generateAnswers(questions));
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

      this.enableAnswers();
    }

    generateAnswers = (questions) => {
      const { next } = this.state;
      const wrongAnswers = questions[next].incorrect_answers
        .map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            onClick={ this.changeAnswerColor }
            className="wrong-buttons"
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
        >
          {questions[next].correct_answer }
        </button>,
        ...wrongAnswers,
      ];

      // Função que gera números aleatórios a ser usado no sort() para renderizar respostas em ordem aleatória. Referência: https://ichi.pro/pt/como-obter-um-item-aleatorio-de-um-array-javascript-140857367711251
      const orderNumber = 0.5;
      this.setState({ answers: arrOfAnswers.sort(() => orderNumber - Math.random()) });
    }

    // Refatorar para deixar dinâmico sem manipular o DOM
    changeAnswerColor = () => {
      const correctButton = document.querySelector(correctAnswerStr);
      correctButton.classList.add('correct-color');

      const wrongButtons = document.querySelectorAll(wrongAnswerStr);
      wrongButtons.forEach((element) => {
        element.classList.add('wrong-color');
      });

      this.setState({ nextButtonVisible: true });
    }

    removeAnswerBorder = () => {
      const correctButton = document.querySelector(correctAnswerStr);
      correctButton.classList.remove('correct-color');

      const wrongButtons = document.querySelectorAll(wrongAnswerStr);
      wrongButtons.forEach((element) => element.classList.remove('wrong-color'));
    }

    disableAnswers = () => {
      const correctButton = document.querySelector(correctAnswerStr);
      correctButton.disabled = true;

      const wrongButtons = document.querySelectorAll(wrongAnswerStr);
      wrongButtons.forEach((element) => {
        element.disabled = true;
      });
    }

    enableAnswers = () => {
      const correctButton = document.querySelector(correctAnswerStr);
      correctButton.disabled = false;

      const wrongButtons = document.querySelectorAll(wrongAnswerStr);
      wrongButtons.forEach((element) => {
        element.disabled = false;
      });
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
      const { next, nextButtonVisible, timer, answers } = this.state;
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
          <section className="timer">
            <span>{ timer }</span>
          </section>
          <h3 data-testid="question-category">{ questions[next].category }</h3>
          <h2 data-testid="question-text">{ questions[next].question }</h2>
          <div data-testid="answer-options" id="answers-div" className="answers">
            {questions && answers}
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
  getMapToken: state.token,

});

const mapDispatchToProps = (dispatch) => ({
  addPlayerScore: (playerScore) => (
    dispatch(getPlayerScore(playerScore))),
  addAssertions: (assertions) => (
    dispatch(getAssertions(assertions))),
  getQuestions: (token) => (
    dispatch(fetchQuestionsThunk(token))),
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
  getMapToken: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
