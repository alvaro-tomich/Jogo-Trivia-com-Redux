import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
    state= {
      next: 0,
    }

    handleClick = () => {
      const { next } = this.state;
      const { questions } = this.props;
      console.log(questions.length);
      const maxNumber = questions.length - 2;
      if (next <= maxNumber) {
        this.setState((prevState) => ({
          next: prevState.next + 1,
        }));
      }
    }

    generateAnswers = (questions) => {
      const { next } = this.state;
      const orderNumber = 0.5;
      const wrongAnswers = questions[next].incorrect_answers
        .map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            { answer }
          </button>
        ));
      const arrOfAnswers = [
        <button
          key="correct"
          type="button"
          data-testid="correct-answer"
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

    render() {
      const { next } = this.state;
      const { questions } = this.props;
      if (questions.length === 0) {
        console.log(questions);
        return <p>loading</p>;
      }
      return (
        <div>
          <p data-testid="question-category">{ questions[next].category }</p>
          <p data-testid="question-text">{ questions[next].question }</p>
          <div data-testid="answer-options">
            {questions && this.generateAnswers(questions)}
          </div>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>
        </div>
      );
    }
}

Questions.propTypes = {
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
