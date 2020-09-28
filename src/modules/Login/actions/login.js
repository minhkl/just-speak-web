import {requestLogin, requestValidateToken} from '../services';

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

export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutRequestAction());
};

export const loginAction = ({username, password}) => async (dispatch) => {
  dispatch(loginRequestAction());
  // Login - request a token
  const [loginError, loginResponse] = await requestLogin({username, password});
  if (loginError) {
    dispatch(loginFailAction(loginError?.error));
    return;
  }
  const token = loginResponse?.data?.token;
  localStorage.setItem('token', token);

  // Get user information from the token
  const [error, response] = await requestValidateToken({token});
  if (error) {
    dispatch(loginFailAction(error?.error));
  }
  dispatch(loginSuccessAction(response?.data));
};
