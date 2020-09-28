import React from 'react';
import PropTypes from 'prop-types';
import {Button, Layout, Menu, Typography} from 'antd';
import {Link} from '@reach/router';
import classes from './classes.module.css';
import withAuth from 'src/modules/Login/hocs/withAuth';
import logo from 'src/modules/Admin/logo.png';

const {Header, Content} = Layout;

const LandingPageBase = ({isLoggedIn, logout}) => (
  <Layout className="full-screen">
    <Header className={classes.header}>
      <div className={classes.leftMenuWrapper}>
        <div className={classes.logoWrapper}>
          <img src={logo} alt="JustSpeak" className={classes.logo}/>
        </div>
        {isLoggedIn && (
          <Menu mode="horizontal" theme="dark">
            <Menu.Item>
              <Link to="/admin">Admin</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/user">User</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
      <Menu mode="horizontal" theme="dark">
        {isLoggedIn ? <Button type="Link" onClick={logout}>Logout</Button> : <Link to="/login">Login</Link>}
      </Menu>
    </Header>
    <Layout>
      <Content>
        <Typography.Title>Wellcome to Just Speak</Typography.Title>
      </Content>
    </Layout>
  </Layout>
);

LandingPageBase.propTypes = {
  children: PropTypes.any,
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

const LandingPage = withAuth(LandingPageBase);
export default LandingPage;
