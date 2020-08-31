import {loginAction, loginRequestAction, loginSuccessAction, loginFailAction} from './index';
import thunk from 'redux-thunk';
// import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([thunk]);

const initialState = {};

describe('Login actions', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('dispatches success action when login succeeds', async (done) => {
    const mockLoginResponse = {
      status: 'success',
      data: {
        token: 'the_token_abcxxx',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockLoginResponse,
      });
    });
    const expectedActions = [
      loginRequestAction(),
      loginSuccessAction(mockLoginResponse),
    ];
    await store.dispatch(loginAction({username: 'minh', password: 'pass'}));
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
    done();
  });

  it('dispatches error action when login fails', (done) => {
    const mockLoginResponse = {
      status: 'error',
      error: {message: 'Invalid username or password'},
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockLoginResponse,
      });
    });
    const expectedActions = [
      loginRequestAction(),
      loginFailAction(mockLoginResponse),
    ];
    store.dispatch(loginAction({})).catch(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
      done();
    });
  });
});
