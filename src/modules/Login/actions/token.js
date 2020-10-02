import {requestRenewAccessToken} from '../services';

export const renewTokenRequestAction = (payload, meta) => ({
  type: 'RENEW_ACCESS_TOKEN_REQUEST',
  payload,
  meta,
});

export const renewTokenSuccessAction = (payload) => ({
  type: 'RENEW_ACCESS_TOKEN_SUCCESS',
  payload,
});

export const renewTokenFailAction = (payload) => ({
  type: 'RENEW_ACCESS_TOKEN_FAIL',
  payload,
});

export const renewTokenAction = (hideLoading) => async (dispatch) => {
  dispatch(renewTokenRequestAction(undefined, {keepState: hideLoading}));
  const [error, response] = await requestRenewAccessToken();
  if (error) {
    dispatch(renewTokenFailAction(error));
  } else {
    dispatch(renewTokenSuccessAction(response?.data));
  }
};
