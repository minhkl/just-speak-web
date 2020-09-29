import {requestLogin, requestLogout, requestValidateToken} from '../services';

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

export const loginAction = ({username, password}) => async (dispatch) => {
  dispatch(loginRequestAction());
  // Login - request a token
  const [loginError] = await requestLogin({username, password});
  if (loginError) {
    dispatch(loginFailAction(loginError?.error));
    return;
  }

  // Get user information from the token
  const [error, response] = await requestValidateToken();
  if (error) {
    dispatch(loginFailAction(error?.error));
  }
  dispatch(loginSuccessAction(response?.data));
};
