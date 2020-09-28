import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';
import cs from 'classnames';
import withAuth from 'src/modules/Login/hocs/withAuth';
import {Layout} from 'antd';
import UserProfilePopover from 'src/components/UserProfilePopover';
import logo from 'src/assets/images/logo.png';
import classes from './classes.module.css';

const HeaderBase = ({isLoggedIn, leftMenu, rightMenu, homePageLink, className}) => (
  <Layout.Header className={cs(classes.header, className)}>
    <div className={classes.leftMenuWrapper}>
      <div className={classes.logoWrapper}>
        <Link to={homePageLink || '/'}>
          <img src={logo} alt="JustSpeak" className={classes.logo}/>
        </Link>
      </div>
      {leftMenu}
    </div>
    <div className={classes.rightMenuWrapper}>
      {rightMenu}
      {isLoggedIn ? <UserProfilePopover /> : <Link to="/login">Login</Link>}
    </div>
  </Layout.Header>
);

HeaderBase.propTypes = {
  homePageLink: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  className: PropTypes.string,
  leftMenu: PropTypes.element,
  rightMenu: PropTypes.element,
};

const Header = withAuth(HeaderBase);

export default Header;
