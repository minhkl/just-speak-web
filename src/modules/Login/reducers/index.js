import {combineReducers} from 'redux';
import login from './login';
import token from './token';

const authReducer = combineReducers({
  login, token,
});

export default authReducer;
