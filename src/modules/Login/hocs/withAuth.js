
import {connect} from 'react-redux';
import {validateTokenAction, logoutAction} from 'src/modules/Login/actions';

const mapStateToProps = (state) => ({
  isLoggedIn: !!state?.auth?.login?.data,
  isValidatingToken: !!state?.token?.isRequesting,
  didValidateToken: !!state?.auth?.token?.done,
});

const mapDispatchToProps = (dispatch) => ({
  validateToken: (token) => {
    dispatch(validateTokenAction({token}));
  },
  logout: () => {
    dispatch(logoutAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
