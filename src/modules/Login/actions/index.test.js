import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { apiUrl } from 'src/utils/helpers';
import { renewTokenAction, renewTokenRequestAction, renewTokenSuccessAction } from './token';
import {
  loginAction, loginRequestAction, loginSuccessAction, loginFailAction,
} from './login';

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

  it('dispatches success action when renew token successfully', async (done) => {
    const mockResponse = {
      status: 'success',
      data: {
        token: 'a-token',
      },
    };
    moxios.stubRequest(apiUrl('/auth/refresh_token'), {
      status: 200,
      response: mockResponse,
    });
    const expectedActions = [
      renewTokenRequestAction(undefined, { keepState: true }),
      renewTokenSuccessAction(mockResponse.data),
    ];
    await store.dispatch(renewTokenAction(true));
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
    moxios.stubRequest(apiUrl('/auth/login'), {
      status: 200,
      response: mockLoginResponse,
    });

    const expectedActions = [
      loginRequestAction(),
      loginSuccessAction(mockLoginResponse.data),
    ];
    await store.dispatch(loginAction({ username: 'minh', password: 'pass' }));
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
    done();
  });

  it('dispatches error action when login fails', async (done) => {
    const mockLoginResponse = {
      status: 'error',
      error: { message: 'Invalid username or password' },
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
