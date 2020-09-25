import React from 'react';
import PropTypes from 'prop-types';
import AdminHeader from 'src/components/AdminHeader';

const Admin = ({children}) => (
  <div>
    <AdminHeader />
    {children}
  </div>
);

Admin.propTypes = {
  children: PropTypes.any,
};

export default Admin;
