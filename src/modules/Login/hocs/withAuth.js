
import {connect} from 'react-redux';
import {renewTokenAction, logoutAction} from 'src/modules/Login/actions';

const mapStateToProps = (state) => ({
  isLoggedIn: !!state?.auth?.login?.data,
  didRenewToken: !!state?.auth?.token?.done,
});

const mapDispatchToProps = (dispatch) => ({
  renewAccessToken: () => {
    dispatch(renewTokenAction());
  },
  logout: () => {
    dispatch(logoutAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
