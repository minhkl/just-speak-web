import {combineReducers} from 'redux';
import authReducer from 'src/modules/Login/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
