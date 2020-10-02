import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Input, Button, Checkbox, Typography, Form, Card, Alert} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {loginAction} from '../../actions';
import classes from './classes.module.css';

const {Title} = Typography;

const defaultValues = {
  username: process.env.REACT_APP_PREFILL_USERNAME || '',
  password: process.env.REACT_APP_PREFILL_PASSWORD || '',
};

export const LoginFormBase = ({className, requestLogin, isLoggingIn, loginError}) => {
  const onSubmit = useCallback((data) => {
    requestLogin(data);
  }, [requestLogin]);

  const errorMessage = loginError ? loginError.message : null;
  return (
    <Card className={cs(classes.LoginForm, className)}>
      <Form initialValues={defaultValues} onFinish={onSubmit} layout="vertical">
        <Title>Just Speak</Title>
        {errorMessage && <Alert type="error" className={classes.LoginForm_ErrorAlert} message={errorMessage}></Alert>}
        <Form.Item name="username" rules={[{required: true, message: 'Please enter username'}]}>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: 'Please enter password'}]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={classes.LoginForm_SubmitButton}
            loading={isLoggingIn}
          >{isLoggingIn ? 'Login...' : 'Login'}</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  isLoggingIn: state?.auth?.login?.isRequesting,
  loginError: state?.auth?.login?.error,
});

const mapDispatchToProps = (dispatch) => ({
  requestLogin: async (data) => {
    return await dispatch(loginAction(data));
  },
});

LoginFormBase.propTypes = {
  className: PropTypes.string,
  requestLogin: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  loginError: PropTypes.object,
};

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormBase);

export default LoginForm;
