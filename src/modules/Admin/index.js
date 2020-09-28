import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Layout, Menu} from 'antd';
import {HomeOutlined, AlignLeftOutlined} from '@ant-design/icons';
import {Link} from '@reach/router';
import withAuth from 'src/modules/Login/hocs/withAuth';
import Header from 'src/components/Header';
import classes from './classes.module.css';

const {Content, Sider} = Layout;

const AdminBase = ({children, contentClassName}) => (
  <Layout className={classes.admin}>
    <Header />
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
};

const Admin = withAuth(AdminBase);
export default Admin;
