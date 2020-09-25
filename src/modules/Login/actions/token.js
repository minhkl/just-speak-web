import request from 'src/utils/request';
import {loginSuccessAction} from './login';

export const validateTokenRequestAction = () => ({
  type: 'VALIDATE_TOKEN_REQUEST',
});

export const validateTokenSuccessAction = (payload) => ({
  type: 'VALIDATE_TOKEN_SUCCESS',
  payload,
});

export const validateTokenFailAction = (payload) => ({
  type: 'VALIDATE_TOKEN_FAIL',
  payload,
});

export const validateTokenAction = ({token}) => async (dispatch) => {
  dispatch(validateTokenRequestAction());
  if (!token) {
    dispatch(validateTokenFailAction());
    return;
  }
  const [error, response] = await request('http://localhost:5555/auth/user', {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`},
  });
  if (error) {
    dispatch(validateTokenFailAction(error));
  } else {
    dispatch(validateTokenSuccessAction(response?.data));
    dispatch(loginSuccessAction(response?.data));
  }
};
