export const initialState = {
  data: null,
  error: null,
  isRequesting: false,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case 'LOGIN_REQUEST': {
    return {
      data: null,
      isRequesting: true,
      error: null,
    };
  }
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

export default reducer;
