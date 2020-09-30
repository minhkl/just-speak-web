export const initialState = {
  isRequesting: false,
  isSuccess: null,
  done: null,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case 'RENEW_ACCESS_TOKEN_REQUEST': {
    return {
      isRequesting: true,
      isSuccess: null,
      done: false,
    };
  }
  case 'RENEW_ACCESS_TOKEN_SUCCESS': {
    return {
      isRequesting: false,
      isSuccess: true,
      done: true,
    };
  }
  case 'RENEW_ACCESS_TOKEN_FAIL': {
    return {
      isRequesting: false,
      isSuccess: false,
      done: true,
    };
  }
  default:
    return state;
  }
};

export default reducer;
