import React, {useCallback} from 'react';
import {connect} from 'react-redux';
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
import {loginAction} from '../../actions';
import classes from './classes.module.css';

const defaultValues = {
  username: 'minhkl1',
  password: 'minhkl123',
};

const LoginForm = ({className, requestLogin, isLoggingIn, loginError}) => {
  const {handleSubmit, errors, control} = useForm({defaultValues});
  const onSubmit = useCallback((data) => {
    requestLogin(data).then(() => console.log('success')).catch((e) => console.log('fail', e));
  }, [requestLogin]);
  const errorMessage = loginError ? loginError.error.message : null;
  return (
    <Paper elevation={3} className={cs(classes.LoginForm, className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h1">Just Speak</Typography>
        {errorMessage && <Alert severity="error" className={classes.LoginForm_ErrorAlert}>{errorMessage}</Alert>}
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
          disabled={isLoggingIn}
          fullWidth>{isLoggingIn ? 'Login...' : 'Login'}</Button>
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  isLoggingIn: state?.auth?.isRequesting,
  loginError: state?.auth?.error,
});

const mapDispatchToProps = (dispatch) => ({
  requestLogin: async (data) => {
    return await dispatch(loginAction(data));
  },
});

LoginForm.propTypes = {
  className: PropTypes.string,
  requestLogin: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  loginError: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
