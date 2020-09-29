import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Router} from '@reach/router';
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

const AppBase = ({validateToken, didValidateToken}) => {
  useEffect(() => {
    validateToken();
  }, []);

  if (!didValidateToken) {
    return 'Validating';
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
  validateToken: PropTypes.func,
  didValidateToken: PropTypes.bool,
};

const App = withAuth(AppBase);
export default App;
