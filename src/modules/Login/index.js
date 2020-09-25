import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import LoginForm from './components/LoginForm';
import classes from './classes.module.css';
import {navigate} from '@reach/router';

const Login = ({isLoggedIn}) => {
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [isLoggedIn]);

  return (
    <Container maxWidth="xs" className={classes.Login}>
      <LoginForm className={classes.Login_LoginForm}/>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state?.auth?.login?.data,
});

Login.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(Login);
