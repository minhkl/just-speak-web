import {requestRenewAccessToken} from '../services';

export const renewTokenRequestAction = () => ({
  type: 'RENEW_ACCESS_TOKEN_REQUEST',
});

export const renewTokenSuccessAction = (payload) => ({
  type: 'RENEW_ACCESS_TOKEN_SUCCESS',
  payload,
});

export const renewTokenFailAction = (payload) => ({
  type: 'RENEW_ACCESS_TOKEN_FAIL',
  payload,
});

export const renewTokenAction = () => async (dispatch) => {
  dispatch(renewTokenRequestAction());
  const [error, response] = await requestRenewAccessToken();
  if (error) {
    dispatch(renewTokenFailAction(error));
  } else {
    dispatch(renewTokenSuccessAction(response?.data));
  }
};
