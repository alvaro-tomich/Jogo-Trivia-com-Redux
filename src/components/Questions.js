import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
    state = {
      next: 0,
      nextButtonVisible: false,
    }

    nextQuestionClick = () => {
      const { next } = this.state;
      const { questions } = this.props;
      const maxNumber = questions.length - 2;
      if (next <= maxNumber) {
        this.setState((prevState) => ({
          next: prevState.next + 1,
        }));
      }
      this.removeAnswerBorder();
      this.setState({ nextButtonVisible: false });

      /* estou chamando abaixo a função que guarda o placar só pra testar o valor do calculo, quando clica no next
      ele exibe um console.log com o valor que vamos exibir no Header depois */
      this.increaseScore(questions, 2);
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
          /* a função de placar deveria ser chamada nesse onclick mas quando tentei chamar ela quebrou, por
          isso chamei ela no botão next */
          onClick={ this.changeAnswerColor }
          className="correct-button"
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

    /* funçao pra aumentar o placar no header */
    increaseScore = (questions, timerValue) => {
      this.changeAnswerColor();
      const { next } = this.state;
      const { difficulty } = questions[next];
      const numberTen = 10;

      const questionLevels = {
        hard: 3,
        medium: 2,
        easy: 1,
      };

      /* abaixo eu pego objeto que criei e transformo num array, em que cada index é um arrayzinho tipo
      ['medium', '2']. Uso o find pra me retornar o arrayzinho que o indice[0] for igual o nivel da
      dificuldade da pergunta atual */
      const levelScore = Object.entries(questionLevels)
        .find((level) => level[0] === difficulty);

      /* Abaixo faço o calculo(que esta no ReadMe) usando o indice[1] do arrayzinho pra pegar quantos
      pontos o nivel de dificuldade da pergunta atual vale */
      const calculateScore = numberTen + (timerValue * levelScore[1]);
      localStorage.setItem('score', calculateScore);
      console.log(calculateScore);
    }

    render() {
      const { next, nextButtonVisible } = this.state;
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
  questions: PropTypes.arrayOf(PropTypes.shape({
    length: PropTypes.number,
    category: PropTypes.string,
    question: PropTypes.string,
    difficulty: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Questions);
