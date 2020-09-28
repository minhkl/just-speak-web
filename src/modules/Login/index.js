import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoginForm from './components/LoginForm';
import classes from './classes.module.css';
import {navigate} from '@reach/router';

const Login = ({isLoggedIn}) => {
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.Login}>
      <LoginForm className={classes.Login_LoginForm}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state?.auth?.login?.data,
});

Login.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(Login);
