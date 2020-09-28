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

export const validateTokenAction = ({token}) => async (dispatch) => {
  dispatch(validateTokenRequestAction());
  if (!token) {
    dispatch(validateTokenFailAction());
    return;
  }
  const [error, response] = await requestValidateToken({token});
  if (error) {
    dispatch(validateTokenFailAction(error));
  } else {
    dispatch(loginSuccessAction(response?.data));
    dispatch(validateTokenSuccessAction(response?.data));
  }
};
