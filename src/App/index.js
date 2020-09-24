import React from 'react';
import {Router} from '@reach/router';
import Login from 'src/modules/Login';
import AdminHome from 'src/modules/AdminHome';
import Admin from 'src/modules/Admin';
import User from 'src/modules/User';
import UserHome from 'src/modules/UserHome';
import AdminPatterns from 'src/modules/AdminPatterns';
import PrivateRoute from 'src/components/PrivateRoute';
import classes from './classes.module.css';

function App() {
  return (
    <div className={classes.App}>
      <Router>
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
}

export default App;
