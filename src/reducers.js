import {combineReducers} from 'redux';
import loginReducer from 'src/modules/Login/reducers';

const rootReducer = combineReducers({
  auth: loginReducer,
});

export default rootReducer;
