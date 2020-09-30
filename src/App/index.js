import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Router} from '@reach/router';
import {Spin} from 'antd';
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

const REACT_APP_REFRESH_TOKEN_INTERVAL = process.env.REACT_APP_REFRESH_TOKEN_INTERVAL * 60 * 1000;

const AppBase = ({renewAccessToken, didRenewToken, isLoggedIn}) => {
  const timer = useRef(null);
  // Request access token for the first time
  useEffect(() => {
    renewAccessToken();
  }, []);

  // if user has logged in, request access token after a perior of time
  useEffect(() => {
    if (isLoggedIn) {
      timer.current = setInterval(() => renewAccessToken(true), REACT_APP_REFRESH_TOKEN_INTERVAL);
    } else {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }
  }, [isLoggedIn]);

  if (!didRenewToken) {
    return <Spin size={36} />;
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
