import { createStore, applyMiddleware } from 'redux';
import { compose } from 'recompose';
import thunk from 'redux-thunk';
import rootReducer from 'src/reducers';

const enhancers = [
  applyMiddleware(thunk),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }),
].filter((enhancer) => enhancer instanceof Function);

const store = createStore(rootReducer, compose(...enhancers));

export default store;
