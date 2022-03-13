import { fetchToken, fetchQuestions } from '../../services/api';
import {
  GET_TOKEN,
  SAVE_PLAYER,
  SAVE_SCORE,
  GET_ASSERTIONS,
  GET_API_QUESTIONS,
} from './actionTypes';

const getQuestions = (questions) => ({
  type: GET_API_QUESTIONS,
  payload: questions,
});

const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const getPlayerInfo = (email, name) => ({
  type: SAVE_PLAYER,
  payload: {
    email,
    name,
  },
});

export const getPlayerScore = (playerScore) => ({
  type: SAVE_SCORE,
  payload: playerScore,
});

export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  payload: assertions,
});

export const fetchTokenThunk = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(getToken(token));
};

export const fetchQuestionsThunk = (token) => async (dispatch) => {
  const questions = await fetchQuestions(token);
  if (questions.length === 0) {
    const tokenGet = await fetchToken();
    dispatch(getToken(tokenGet));
    localStorage.setItem('token', tokenGet);
    const questionsGet = await fetchQuestions(tokenGet);
    await dispatch(getQuestions(questionsGet));
  }
  await dispatch(getQuestions(questions));
};
