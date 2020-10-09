import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import Header from 'src/components/Header';
import { Layout } from 'antd';
import classes from './classes.module.css';

const { Content } = Layout;

const User = ({ children, contentClassName }) => (
  <Layout>
    <Header homePageLink="/user" />
    <Content className={cs(classes.content, contentClassName)}>
      {children}
    </Content>
  </Layout>
);

User.defaultProps = {
  contentClassName: '',
};

User.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  contentClassName: PropTypes.string,
};

export default User;
