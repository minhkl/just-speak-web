import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {useForm, Controller} from 'react-hook-form';
import request from 'src/utils/request';
import classes from './classes.module.css';

const defaultValues = {
  username: 'admin',
  password: 'admin123',
};

const LoginForm = ({className}) => {
  const [loginError, setLoginError] = useState();
  const {handleSubmit, errors, control} = useForm({defaultValues});
  const onSubmit = useCallback(async (data) => {
    setLoginError(null);
    const [error, response] = await request('http://localhost:5555/auth', {
      method: 'POST',
      data,
    });
    if (error) {
      setLoginError(error?.data?.error?.message);
      return;
    }
    alert('Login Successfully');
    console.log('response', response);
  }, []);
  return (
    <Paper elevation={3} className={cs(classes.LoginForm, className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h1">Just Speak</Typography>
        {loginError && <Alert severity="error" className={classes.LoginForm_ErrorAlert}>{loginError}</Alert>}
        <Controller
          control={control}
          name="username"
          rules={{required: {value: true, message: 'Please enter username'}}}
          as={<TextField
            error={!!errors?.username}
            helperText={errors?.username?.message}
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth/>}
        />
        <Controller
          control={control}
          name="password"
          rules={{required: {value: true, message: 'Please enter password'}}}
          as={<TextField
            label="Password"
            error={!!errors?.password}
            helperText={errors?.password?.message}
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth/>}
        />
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember Me"
          labelPlacement="end"
        />
        <Button
          variant="contained"color="primary"
          size="large"
          className={classes.LoginForm_SubmitButton}
          type="submit"
          fullWidth>Login</Button>
      </form>
    </Paper>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
