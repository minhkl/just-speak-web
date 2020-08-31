import request from 'src/utils/request';

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

export const loginAction = ({username, password}) => async (dispatch) => {
  dispatch(loginRequestAction());
  const [error, response] = await request('http://localhost:5555/auth', {
    method: 'POST',
    data: {username, password},
  });
  if (error) {
    return Promise.reject(dispatch(loginFailAction(error?.data)));
  } else {
    return Promise.resolve(dispatch(loginSuccessAction(response?.data)));
  }
};
