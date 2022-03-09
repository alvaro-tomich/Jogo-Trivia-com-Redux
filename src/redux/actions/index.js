import { fetchToken, fetchQuestions } from '../../services/api';

export const GET_API_QUESTIONS = 'GET_API_QUESTIONS';

const getQuestions = (questions) => ({
  type: GET_API_QUESTIONS,
  payload: questions,
});

const getToken = (token) => ({
  type: 'GET_TOKEN',
  payload: token,
});

export const getEmail = (email) => ({
  type: 'SAVE_EMAIL',
  payload: email,
});

export const fetchTokenThunk = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(getToken(token));
};

export const fetchQuestionsThunk = () => async (dispatch) => {
  const token = await fetchToken();
  const questions = await fetchQuestions(token);
  await dispatch(getQuestions(questions));
};
