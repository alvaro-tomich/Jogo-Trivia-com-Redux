import fetchQuestions from '../../services/api';

export const GET_API_QUESTIONS = 'GET_API_QUESTIONS';

export const getQuestions = (questions) => ({
  type: GET_API_QUESTIONS,
  payload: questions,
});

export default fetchQuestionsThunk = () => async (dispatch) => {
  dispatch(getQuestions(fetchQuestions));
};
