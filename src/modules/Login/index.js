import React from 'react';
import Container from '@material-ui/core/Container';


import LoginForm from './components/LoginForm';

import classes from './classes.module.css';

const Login = () => {
  return (
    <Container maxWidth="xs" className={classes.Login}>
      <LoginForm className={classes.Login_LoginForm}/>
    </Container>
  );
};

export default Login;
