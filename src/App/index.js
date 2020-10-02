import React, {useEffect} from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import {Router} from '@reach/router';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import LandingPage from 'src/modules/LandingPage';
import Login from 'src/modules/Login';
import AdminHome from 'src/modules/AdminHome';
import Admin from 'src/modules/Admin';
import User from 'src/modules/User';
import UserHome from 'src/modules/UserHome';
import AdminPatterns from 'src/modules/AdminPatterns';
import PrivateRoute from 'src/components/PrivateRoute';
import classes from './classes.module.css';
import withAuth from 'src/modules/Login/hocs/withAuth';
import {useInterval} from 'src/utils/hocs';

const REACT_APP_REFRESH_TOKEN_INTERVAL =0.1 * 60 * 1000;

const AppBase = ({renewAccessToken, didRenewToken, isLoggedIn}) => {
  // Request access token for the first time
  useEffect(renewAccessToken, []);

  // if user has logged in, request access token after a perior of time
  useInterval({
    condition: isLoggedIn,
    onTick: () => renewAccessToken(true),
    interval: REACT_APP_REFRESH_TOKEN_INTERVAL,
  });

  if (!didRenewToken) {
    return (
      <div className={cs(classes.App, classes.App_loading)}>
        <Spin indicator={<LoadingOutlined style={{fontSize: 100}} spin />} />
      </div>
    );
  }

  return (
    <div className={classes.App}>
      <Router>
        <LandingPage path="/" />
        <Login path="/login" />
        <Admin path="/admin">
          <PrivateRoute component={AdminHome} path="/" />
          <PrivateRoute component={AdminPatterns} path="patterns" />
        </Admin>
        <User path="/user">
          <PrivateRoute component={UserHome} path="/" />
        </User>
      </Router>
    </div>
  );
};

AppBase.propTypes = {
  renewAccessToken: PropTypes.func,
  didRenewToken: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

const App = withAuth(AppBase);
export default App;
