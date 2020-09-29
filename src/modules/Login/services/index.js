import request from 'src/utils/request';
import {apiUrl} from 'src/utils/helpers';

export const requestLogin = ({username, password}) => {
  const options = {
    method: 'POST',
    data: {username, password},
  };
  return request(apiUrl('/auth/login'), options);
};

export const requestLogout = () => {
  const options = {
    method: 'POST',
  };
  return request(apiUrl('/auth/logout'), options);
};

export const requestValidateToken = () => {
  const options = {
    method: 'POST',
  };
  return request(apiUrl('/auth/user'), options);
};
