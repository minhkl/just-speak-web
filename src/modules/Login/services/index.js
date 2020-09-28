import request from 'src/utils/request';
import {apiUrl} from 'src/utils/helpers';

export const requestLogin = ({username, password}) => {
  const options = {
    method: 'POST',
    data: {username, password},
  };
  return request(apiUrl('/auth/login'), options);
};

export const requestValidateToken = ({token}) => {
  const options = {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`},
  };
  return request(apiUrl('/auth/user'), options);
};
