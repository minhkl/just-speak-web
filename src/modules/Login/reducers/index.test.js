import reducer, {initialState} from './login';
import * as LoginActions from '../actions';

describe('Login Reducer', () => {
  it('handles LOGIN_REQUEST action', (done) => {
    const newState = reducer(initialState, LoginActions.loginRequestAction());
    expect(newState).toEqual({
      isRequesting: true,
      data: null,
      error: null,
    });
    done();
  });
  it('handles LOGIN_SUCCESS action', (done) => {
    const loginRequestState = reducer(initialState, LoginActions.loginRequestAction());
    const loginSuccessState = reducer(loginRequestState, LoginActions.loginSuccessAction({something: 'something'}));
    expect(loginSuccessState).toEqual({
      isRequesting: false,
      error: null,
      data: {something: 'something'},
    });
    done();
  });
  it('handles LOGIN_FAIL action', (done) => {
    const loginRequestState = reducer(initialState, LoginActions.loginRequestAction());
    const loginFailState = reducer(loginRequestState, LoginActions.loginFailAction({error: 'something'}));
    expect(loginFailState).toEqual({
      isRequesting: false,
      error: {error: 'something'},
      data: null,
    });
    done();
  });
});
