import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Button, Layout, Menu} from 'antd';
import {HomeOutlined, AlignLeftOutlined} from '@ant-design/icons';
import {Link} from '@reach/router';
import classes from './classes.module.css';
import withAuth from 'src/modules/Login/hocs/withAuth';
import logo from './logo.png';
const {Header, Content, Sider} = Layout;

const AdminBase = ({children, logout, contentClassName}) => (
  <Layout className={classes.admin}>
    <Header className={classes.header}>
      <div className={classes.logoWrapper}>
        <img src={logo} alt="JustSpeak" className={classes.logo}/>
      </div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Button type="link" onClick={logout}>Logout</Button>
        </Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider theme="light">
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/admin">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<AlignLeftOutlined />}>
            <Link to="/admin/patterns">Patterns</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content className={cs(classes.content, contentClassName)}>
        {children}
      </Content>
    </Layout>
  </Layout>
);

AdminBase.propTypes = {
  children: PropTypes.any,
  contentClassName: PropTypes.string,
  logout: PropTypes.func,
};

const Admin = withAuth(AdminBase);
export default Admin;
