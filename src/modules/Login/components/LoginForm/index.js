import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import classes from './classes.module.css';

const LoginForm = ({className}) => {
  return (
    <Paper elevation={1} className={cs(classes.LoginForm, className)}>
      <Typography variant="h4" component="h1">Just Speak</Typography>
      <TextField label="Username" required variant="outlined" margin="normal" fullWidth/>
      <TextField label="Password" required variant="outlined" margin="normal" type="password" fullWidth/>
      <FormControlLabel
        value="top"
        control={<Checkbox color="primary" />}
        label="Remember Me"
        labelPlacement="end"
      />
      <Button
        variant="contained" color="primary"
        size="large"
        className={classes.LoginForm_SubmitButton}
        fullWidth>Login</Button>
    </Paper>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
