import { GET_TOKEN } from '../actions/actionTypes';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return action.payload;
  default:
    return state;
  }
};

export default token;
