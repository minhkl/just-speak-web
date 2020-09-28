import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Menu, Avatar, Popover} from 'antd';
import withAuth from 'src/modules/Login/hocs/withAuth';
import {UserOutlined} from '@ant-design/icons';
import classes from './classes.module.css';

const AvatarPopoverContent = ({onLogout}) => {
  const handleOnItemClick=useCallback(({key}) => {
    if (key === 'key-logout') {
      onLogout();
    }
  });
  return (
    <Menu className={classes.userProfileMenu} selectable={false} mode="vertical" onClick={handleOnItemClick}>
      <Menu.Item key="key-settings">Settings</Menu.Item>
      <Menu.Item danger key="key-logout">Logout</Menu.Item>
    </Menu>
  );
};

AvatarPopoverContent.propTypes = {
  onLogout: PropTypes.func,
};

const UserProfilePopoverBase = withAuth(({logout}) => (
  <Popover content={<AvatarPopoverContent onLogout={logout}/>} trigger="click" placement="bottomRight">
    <Avatar className="cursor-pointer" size="large" icon={<UserOutlined />} />
  </Popover>
));

UserProfilePopoverBase.propTypes = {
  logout: PropTypes.func,
};

const UserProfilePopover = withAuth(UserProfilePopoverBase);
export default UserProfilePopover;
