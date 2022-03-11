import { combineReducers } from 'redux';
import token from './Token';
import player from './Player';
import questions from './Questions';

const rootReducer = combineReducers({ player, token, questions });

export default rootReducer;
