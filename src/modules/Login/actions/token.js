import {loginSuccessAction} from './login';
import {requestValidateToken} from '../services';

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

export const validateTokenAction = () => async (dispatch) => {
  dispatch(validateTokenRequestAction());
  const [error, response] = await requestValidateToken();
  if (error) {
    dispatch(validateTokenFailAction(error));
  } else {
    dispatch(loginSuccessAction(response?.data));
    dispatch(validateTokenSuccessAction(response?.data));
  }
};
