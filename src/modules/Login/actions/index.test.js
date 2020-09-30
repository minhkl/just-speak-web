import {loginAction, loginRequestAction, loginSuccessAction, loginFailAction} from './login';
import {renewTokenAction, renewTokenRequestAction, renewTokenSuccessAction} from './token';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import {apiUrl} from 'src/utils/helpers';

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

    moxios.stubRequest(apiUrl('/auth/user'), {
      status: 200,
      response: mockResponse,
    });
    const expectedActions = [
      renewTokenRequestAction(),
      loginSuccessAction(mockResponse.data),
      renewTokenSuccessAction(mockResponse.data),
    ];
    await store.dispatch(renewTokenAction({token: 'anytoken'}));
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
    moxios.stubRequest(apiUrl('/auth/login'), {
      status: 200,
      response: mockLoginResponse,
    });

    moxios.stubRequest(apiUrl('/auth/user'), {
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

    moxios.stubRequest(apiUrl('/auth/login'), {
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
