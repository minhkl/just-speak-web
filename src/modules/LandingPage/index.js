import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Layout, Menu, Typography } from 'antd';
import { Link } from '@reach/router';
import withAuth from 'src/modules/Login/hocs/withAuth';
import Header from 'src/components/Header';
import classes from './classes.module.css';

const { Content } = Layout;

const LandingPageBase = ({ isLoggedIn }) => (
  <Layout className={cs('full-screen', classes.landingPage)}>
    <Header
      leftMenu={!isLoggedIn ? null : (
        <Menu mode="horizontal" theme="dark">
          <Menu.Item>
            <Link to="/admin">Admin</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/user">User</Link>
          </Menu.Item>
        </Menu>
      )}
    />
    <Layout>
      <Content className={classes.content}>
        <Typography.Title>Wellcome to Just Speak</Typography.Title>
      </Content>
    </Layout>
  </Layout>
);

LandingPageBase.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const LandingPage = withAuth(LandingPageBase);
export default LandingPage;
