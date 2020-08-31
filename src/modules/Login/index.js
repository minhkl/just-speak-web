import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import LoginForm from './components/LoginForm';
import classes from './classes.module.css';

const Login = ({isLoggedIn}) => {
  return (
    <Container maxWidth="xs" className={classes.Login}>
      {!isLoggedIn && <LoginForm className={classes.Login_LoginForm}/>}
      {isLoggedIn && <p>Login successfully</p>}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state?.auth?.data,
});

Login.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(Login);
