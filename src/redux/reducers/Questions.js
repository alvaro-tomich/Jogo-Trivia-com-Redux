import { GET_API_QUESTIONS } from '../actions';

const INITIAL_STATE = [];

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_API_QUESTIONS:
    return action.payload;
  default:
    return state;
  }
};

export default questions;
