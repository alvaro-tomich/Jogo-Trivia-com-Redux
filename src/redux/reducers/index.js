import { combineReducers } from 'redux';
import tokenReducer from './Token';
import playerReducer from './Player';

const rootReducer = combineReducers({ playerReducer, tokenReducer });

export default rootReducer;
