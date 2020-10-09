import request from 'src/utils/request';
import { apiUrl } from 'src/utils/helpers';

export const requestLogin = ({ username, password }) => {
  const options = {
    method: 'POST',
    data: { username, password },
  };
  return request(apiUrl('/auth/login'), options);
};

export const requestLogout = () => {
  const options = {
    method: 'POST',
  };
  return request(apiUrl('/auth/logout'), options);
};

export const requestRenewAccessToken = () => {
  const options = {
    method: 'POST',
  };
  return request(apiUrl('/auth/refresh_token'), options);
};

export const requestFetchAccount = ({ token }) => {
  const options = {
    method: 'POST',
    token,
  };
  return request(apiUrl('/auth/user'), options);
};
