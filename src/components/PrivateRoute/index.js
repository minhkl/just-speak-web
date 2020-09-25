import React from 'react';
import {Redirect} from '@reach/router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRouteBase = ({isLoggedIn, component: Component, ...rest}) => {
  if (!isLoggedIn) {
    return <Redirect noThrow from={rest.path} to="/login" />;
  }
  return <Component {...rest} />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state?.auth?.login?.data,
});

PrivateRouteBase.propTypes = {
  isLoggedIn: PropTypes.bool,
  component: PropTypes.func,
};

const PrivateRoute = connect(mapStateToProps)(PrivateRouteBase);
export default PrivateRoute;
