import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      const orderNumber = 0.5;
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
          onClick={ this.changeAnswerColor }
          className="correct-button"
          disabled={ isAnswersBtnDisabled }
        >
          {questions[next].correct_answer }
        </button>,
        ...wrongAnswers,
      ];

      function randOrd() {
        return (Math.round(Math.random()) - orderNumber);
      }
      return arrOfAnswers.sort(randOrd);
    }

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
        return <p>loading</p>;
      }
      return (
        <div>
          <header>
            <p>{ timer }</p>
          </header>
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

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    length: PropTypes.number,
    category: PropTypes.string,
    question: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Questions);
