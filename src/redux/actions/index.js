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

export const getPlayerInfo = (email, name) => ({
  type: 'SAVE_PLAYER',
  payload: {
    email,
    name,
  },
});

export const fetchTokenThunk = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(getToken(token));
};

export const fetchQuestionsThunk = (token) => async (dispatch) => {
  const questions = await fetchQuestions(token);
  console.log(questions, 'XABLAAAAAAAU');
  if (questions.length === 0) {
    console.log('TESTEEEEE');
    const tokenGet = await fetchToken();
    dispatch(getToken(tokenGet));
    localStorage.setItem('token', tokenGet);
    const questionsGet = await fetchQuestions(tokenGet);
    await dispatch(getQuestions(questionsGet));
  }
  await dispatch(getQuestions(questions));
};
