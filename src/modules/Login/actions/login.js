import { requestLogin, requestLogout, requestFetchAccount } from '../services';

export const loginRequestAction = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccessAction = (payload) => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

export const loginFailAction = (payload) => ({
  type: 'LOGIN_FAIL',
  payload,
});

export const logoutRequestAction = () => ({
  type: 'LOGOUT_REQUEST',
});

export const logoutSuccessAction = (payload) => ({
  type: 'LOGOUT_SUCCESS',
  payload,
});

export const logoutFailAction = (payload) => ({
  type: 'LOGOUT_FAIL',
  payload,
});

export const logoutAction = () => async (dispatch) => {
  dispatch(logoutRequestAction());

  const [logoutError] = await requestLogout();
  if (logoutError) {
    dispatch(logoutFailAction(logoutError?.error));
  }
  dispatch(logoutSuccessAction());
};

export const loginAction = ({ username, password }) => async (dispatch) => {
  dispatch(loginRequestAction());
  // Login - request a token
  const [loginError, loginResponse] = await requestLogin({ username, password });
  if (loginError) {
    dispatch(loginFailAction(loginError?.error));
  } else {
    dispatch(loginSuccessAction(loginResponse?.data));
  }
  return [loginError, loginResponse];
};

export const fetchAccountRequestAction = () => ({
  type: 'FETCH_ACCOUNT_REQUEST',
});

export const fetchAccountSuccessAction = (payload) => ({
  type: 'FETCH_ACCOUNT_SUCCESS',
  payload,
});

export const fetchAccountFailAction = (payload) => ({
  type: 'FETCH_ACCOUNT_FAIL',
  payload,
});

export const fetchAccountAction = () => async (dispatch) => {
  dispatch(fetchAccountRequestAction());
  const [error, response] = await requestFetchAccount();
  if (error) {
    return Promise.reject(dispatch(fetchAccountFailAction(error?.error)));
  }
  return Promise.resolve(dispatch(fetchAccountSuccessAction(response?.data)));
};
