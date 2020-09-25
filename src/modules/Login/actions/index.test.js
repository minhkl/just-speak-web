import {loginAction, loginRequestAction, loginSuccessAction, loginFailAction} from './login';
import {validateTokenAction, validateTokenRequestAction, validateTokenSuccessAction} from './token';
import thunk from 'redux-thunk';
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

  it('dispatches success action when validate token successfully', async (done) => {
    const mockResponse = {
      status: 'success',
      data: {
        user: {
          username: 'minhkl',
        },
      },
    };

    moxios.stubRequest('http://localhost:5555/auth/user', {
      status: 200,
      response: mockResponse,
    });
    const expectedActions = [
      validateTokenRequestAction(),
      validateTokenSuccessAction(mockResponse.data),
      loginSuccessAction(mockResponse.data),
    ];
    await store.dispatch(validateTokenAction({token: 'anytoken'}));
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
    done();
  });


  it('dispatches success action when login succeeds', async (done) => {
    const mockLoginResponse = {
      status: 'success',
      data: {
        token: 'the_token_abcxxx1',
      },
    };
    const mockAuthUserResponse = {
      status: 'success',
      data: {
        user: {username: 'minh'},
      },
    };
    moxios.stubRequest('http://localhost:5555/auth/login', {
      status: 200,
      response: mockLoginResponse,
    });

    moxios.stubRequest('http://localhost:5555/auth/user', {
      status: 200,
      response: mockAuthUserResponse,
    });

    const expectedActions = [
      loginRequestAction(),
      loginSuccessAction(mockAuthUserResponse.data),
    ];
    await store.dispatch(loginAction({username: 'minh', password: 'pass'}));
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
    done();
  });

  it('dispatches error action when login fails', async (done) => {
    const mockLoginResponse = {
      status: 'error',
      error: {message: 'Invalid username or password'},
    };

    moxios.stubRequest('http://localhost:5555/auth/login', {
      status: 400,
      response: mockLoginResponse,
    });

    const expectedActions = [
      loginRequestAction(),
      loginFailAction(mockLoginResponse.error),
    ];

    await store.dispatch(loginAction({}));

    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
    done();
  });
});
