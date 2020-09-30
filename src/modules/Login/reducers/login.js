export const initialState = {
  data: null,
  error: null,
  isRequesting: false,
};

const loginReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case 'LOGOUT_SUCCESS': {
    return {...initialState};
  }
  case 'LOGIN_REQUEST': {
    return {
      data: null,
      isRequesting: true,
      error: null,
    };
  }
  case 'RENEW_ACCESS_TOKEN_SUCCESS':
  case 'LOGIN_SUCCESS': {
    return {
      data: action?.payload,
      isRequesting: false,
      error: null,
    };
  }
  case 'LOGIN_FAIL': {
    return {
      data: null,
      isRequesting: false,
      error: action?.payload,
    };
  }
  default:
    return state;
  }
};

export default loginReducer;
