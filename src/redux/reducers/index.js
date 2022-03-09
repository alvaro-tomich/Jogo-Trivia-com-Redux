import { combineReducers } from 'redux';
import token from './Token';
import player from './Player';

const rootReducer = combineReducers({ player, token });

export default rootReducer;
